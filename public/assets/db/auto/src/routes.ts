import { Hono } from "hono";
import { AppEnv } from "./types";
import { queryCondition, randomId } from "./functions";
import sortOn from "sort-on";

export const route = new Hono<AppEnv>()

route.get('/:route/:id?', async (c) => {
  const params = c.req.param(); // get all params like :route and :id
  const queries = c.req.query(); // get all queries
  const routeValue = await c.env.KV_DB.get(params.route, 'json'); // get :route value as json
  if (routeValue == null) return c.notFound(); // shows 404 if route doesn't exist

  let data = routeValue; // to be returned

  if (Array.isArray(routeValue)) { // check if routeValue is array so we can do array related things like find() and filter()
    // handle data if :id is presented
    // why it's the first? --> to ensure that filters can only work when :id is not presented
    if (params.id) {

      const dataById = routeValue.find(e => e?.id == params.id); // get data by :id
      if (dataById !== undefined) { data = dataById; } else { return c.notFound(); }

    } else { // means :id is not presented

      // handle queries ( Conditions )
      data = routeValue.filter(e => { // filter array and assign it to [ data ]
        return Object.keys(queries).every(key => { // instead of normal conditions and for easy implementation
          const keyWithoutCond: string = key.replaceAll(/(?:_(gt|gte|lt|lte|ne))?$/ig, ''); // remove [ gt, gte, lt, lte, ne ] from query key, so i can use it to search into the array
          return e[keyWithoutCond] ? queryCondition(key, queries[key], e[keyWithoutCond]): true; //check if query key exists in the array and return true if key is not existed
        });
      });

      // handle queries ( Range )
      const rangeLimit = +queries['_end'] || +queries['_limit'];
      if (queries['_start'] && (queries['_end'] || queries['_limit'])) data = (data as []).slice(+queries['_start'], rangeLimit); // slice data so we can get range

      // handle queries ( Sort )
      if (queries['_sort']) data = sortOn((data as []), queries['_sort'].split(','));

      // handle queries ( Paginate )
      const _per_page = +queries['_per_page'] || 10;
      let _page = +queries['_page'];
      if (_page) {
        const items = (data as []).length;
        const pages = Math.ceil(items / _per_page);
        const first = 1;
        const last = pages;

        // Ensure page is within the valid range
        _page = pages < _page ? 1: _page; // my solution
        // _page = Math.max(1, Math.min(_page, pages)) // json-server solution

        const prev = (_page - 1) || null; // if page=1 -> ( 1-1=0 ) which is falsy value
        const next = _page < pages ? _page + 1: null;

        const startSlice = (_page - 1) * _per_page;
        const paginatedData = (data as []).slice(startSlice, startSlice + _per_page);

        data = {
          first,
          prev,
          next,
          last,
          pages,
          items,
          data: paginatedData,
        };
      } // End handling Paginate

      // handle queries ( Embed )
      // ...

    } // End cheking if it's an array
  }

  return c.json(data);
});

route.post('/:route', async (c) => {
  const params = c.req.param(); // get all params like :route

  const routeValue = await c.env.KV_DB.get(params.route, 'json'); // get :route value as json
  if (routeValue == null) return c.notFound(); // shows 404 if route doesn't exist

  let data = routeValue;
  const jsonBody = await c.req.json();
  let newItem;

  if (Array.isArray(data)) {
    newItem = { id: randomId(), ...jsonBody };
    data.push(newItem); // push the new item
  } else {
    newItem = jsonBody;
    data = newItem;
  }

  await c.env.KV_DB.put(params.route, JSON.stringify(data)); // write changes

  c.status(201);
  return c.json(newItem);
});

route.put('/:route/:id', async (c) => {
  const params = c.req.param(); // get all params like :route and :id

  const routeValue = await c.env.KV_DB.get(params.route, 'json'); // get :route value as json
  if (routeValue == null) return c.notFound(); // shows 404 if route doesn't exist

  let data = routeValue;
  const jsonBody = await c.req.json();
  let modifiedItem;

  if (Array.isArray(data)) {
    modifiedItem = { id: params.id, ...jsonBody };
    const itemIndex = data.findIndex(item => item.id ==  params.id);
    if (itemIndex === -1) return c.notFound();
    data[itemIndex] = modifiedItem;
  } else {
    modifiedItem = jsonBody;
    data = modifiedItem;
  }

  await c.env.KV_DB.put(params.route, JSON.stringify(data)); // write changes

  return c.json(modifiedItem);
});

route.patch('/:route/:id', async (c) => {
  const params = c.req.param(); // get all params like :route and :id

  const routeValue = await c.env.KV_DB.get(params.route, 'json'); // get :route value as json
  if (routeValue == null) return c.notFound(); // shows 404 if route doesn't exist

  let data = routeValue;
  const jsonBody = await c.req.json();
  let modifiedItem: any;

  if (Array.isArray(data)) {
    const itemIndex = data.findIndex(item => item.id ==  params.id);
    if (itemIndex === -1) return c.notFound();
    modifiedItem = data[itemIndex];
    Object.entries(jsonBody).forEach(([key, value]) => {
      if (key != 'id') modifiedItem[key] = value;
    });
    data[itemIndex] = modifiedItem;
  } else {
    modifiedItem = jsonBody;
    data = modifiedItem;
  }

  await c.env.KV_DB.put(params.route, JSON.stringify(data)); // write changes

  return c.json(modifiedItem);
});

route.delete('/:route/:id', async (c) => {
  const params = c.req.param(); // get all params like :route and :id
  const queries = c.req.query(); // get all queries

  const routeValue = await c.env.KV_DB.get(params.route, 'json'); // get :route value as json
  if (routeValue == null) return c.notFound(); // shows 404 if route doesn't exist

  let data = routeValue;

  if (Array.isArray(data)) {
    let itemIndex = 0;
    let item = data.find((item, index) => {
      itemIndex = index;
      return item.id === params.id;
    });
    if (item === undefined) return c.notFound();

    data.splice(itemIndex, 1); // delete item
    await c.env.KV_DB.put(params.route, JSON.stringify(data)); // write changes

    return c.json(item);
  }

  c.status(405);
  return c.text(`${c.req.path} => Method Not Allowed`);
});


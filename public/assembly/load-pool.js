// Limit simultaneous CAD decodes while overlapping independent network requests.
export async function loadPool(items,load,concurrency=4){
 const results=new Array(items.length);let cursor=0;
 await Promise.all(Array.from({length:Math.min(concurrency,items.length)},async()=>{while(cursor<items.length){const index=cursor++;results[index]=await load(items[index],index);}}));
 return results;
}

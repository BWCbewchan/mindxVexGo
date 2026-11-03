const encoder=new TextEncoder(),table=Uint32Array.from({length:256},(_,n)=>{for(let k=0;k<8;k++)n=(n&1)?0xedb88320^(n>>>1):n>>>1;return n>>>0;});
export function crc32(bytes){let n=0xffffffff;for(const b of bytes)n=table[(n^b)&255]^(n>>>8);return (n^0xffffffff)>>>0;}
// ZIP store mode: PNGs are already compressed. UTF-8 names and standard CRC32.
export function zipStore(files){
 if(files.length>65535)throw Error('Quá nhiều file ZIP.');const chunks=[],central=[];let offset=0,centralSize=0;
 const seen=new Set();for(const file of files){
  if(typeof file.name!=='string'||file.name.startsWith('/')||file.name.split(/[\\/]/).some(p=>p==='..')||seen.has(file.name))throw Error('Tên file ZIP không hợp lệ.');seen.add(file.name);
  const name=encoder.encode(file.name),data=typeof file.data==='string'?encoder.encode(file.data):file.data;if(!(data instanceof Uint8Array)||name.length>65535||data.length>0xffffffff)throw Error('Dữ liệu ZIP không hợp lệ.');
  const crc=crc32(data),header=new Uint8Array(30+name.length),v=new DataView(header.buffer);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x800,true);v.setUint16(12,33,true);v.setUint32(14,crc,true);v.setUint32(18,data.length,true);v.setUint32(22,data.length,true);v.setUint16(26,name.length,true);header.set(name,30);
  const entry=new Uint8Array(46+name.length),c=new DataView(entry.buffer);c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x800,true);c.setUint16(14,33,true);c.setUint32(16,crc,true);c.setUint32(20,data.length,true);c.setUint32(24,data.length,true);c.setUint16(28,name.length,true);c.setUint32(42,offset,true);entry.set(name,46);
  chunks.push(header,data);central.push(entry);offset+=header.length+data.length;centralSize+=entry.length;if(offset+centralSize>0xffffffff)throw Error('ZIP vượt 4 GB.');
 }
 const end=new Uint8Array(22),e=new DataView(end.buffer);e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,centralSize,true);e.setUint32(16,offset,true);
 const result=new Uint8Array(offset+centralSize+end.length);let p=0;for(const chunk of [...chunks,...central,end]){result.set(chunk,p);p+=chunk.length;}return result;
}

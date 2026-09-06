import examples from '../../public/quiz/blocks/examples.json';

// Match concepts, not mission numbers: a generic sample must never be presented
// as the original author's complete solution to a physical task.
export function blockExample(prompt:string){
 if(/Repeat Until/i.test(prompt))return examples.until;
 if(/repeat 10/i.test(prompt))return examples.repeat;
 if(/if không có else/i.test(prompt))return examples.condition;
 if(/Forever thực hiện/i.test(prompt))return examples.forever;
 if(/lệnh đặt tốc độ nên nằm/i.test(prompt))return examples.order;
 if(/Muốn thay đổi tốc độ motor/i.test(prompt))return examples.speed;
 if(/Khối chờ theo số giây/i.test(prompt))return examples.wait;
 return null;
}

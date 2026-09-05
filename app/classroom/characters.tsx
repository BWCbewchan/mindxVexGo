export const characters = [
 {id:'nori',name:'Nori',trait:'Curious explorer · Plan your next adventure.'},
 {id:'bolt',name:'Bolt',trait:'Creative builder · Solve it one step at a time.'},
 {id:'luma',name:'Luma',trait:'Thoughtful observer · Ask, test and discover.'},
 {id:'milo',name:'Milo',trait:'Playful artist · Bring your ideas to life.'},
 {id:'pip',name:'Pip',trait:'Caring friend · Small observations matter.'},
 {id:'terra',name:'Terra',trait:'Patient guide · Grow together, step by step.'},
 {id:'ember',name:'Ember',trait:'Brave scout · Courage starts with a small step.'},
 {id:'otto',name:'Otto',trait:'Puzzle solver · Try another way.'},
 {id:'zephyr',name:'Zephyr',trait:'Friendly messenger · Share what you discover.'},
 {id:'maple',name:'Maple',trait:'Gentle storyteller · Every voice has a story.'},
 {id:'flint',name:'Flint',trait:'Careful tester · Check, improve and try again.'},
 {id:'sol',name:'Sol',trait:'Sunny gardener · Encourage something to grow.'},
] as const;
export type CharacterId=typeof characters[number]['id'];
export function CharacterArt({id}:{id:string}){
 const index=characters.findIndex(c=>c.id===id);if(index<0)return null;
 const cell=index%6,character=characters[index];
 return <span className="cr-character-art" role="img" aria-label={`${character.name} companion`} style={{backgroundImage:`url('/classroom/characters/team-concept-v${index<6?1:2}.png')`,backgroundPosition:`${(cell%3)*50}% ${Math.floor(cell/3)*100}%`}}/>;
}

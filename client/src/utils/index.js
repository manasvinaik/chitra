import FileSaver from 'file-saver'
import {surpriseMePrompts} from '../constants'

export function getRandomPrompt(currentPrompt) {
    let randomPrompt = currentPrompt;
    while (randomPrompt === currentPrompt) {
        const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
        randomPrompt = surpriseMePrompts[randomIndex];
    }
    return randomPrompt;
}
export async function downloadImage(_id,photo){
    FileSaver.saveAs(photo,`download-${_id}.jpg`);
}
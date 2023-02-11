import React from 'react';
import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo, negativePrompt, steps, cfgScale }) => (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
        <img
            className="w-full h-auto object-cover rounded-xl"
            src={photo}
            alt={prompt}
        />

        <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
            <div className={'text-white text-xs overflow-y-auto prompt'}>
                <div className={'mb-3'}>
                    <p className={'text-orange-400'}>Prompt:</p>
                    <p>{prompt}</p>
                </div>

                {negativePrompt &&
                <div className={'mb-3'}>
                    <p className={'text-orange-400'}>Negative prompt:</p>
                    <p>{negativePrompt}</p> </div>}
                <div className={'inline-block'}>
                    <p>Steps: <b>{steps}</b></p>
                    <p>cfgScale: <b>{cfgScale}</b></p>
                </div>

            </div>

            <div className="mt-5 flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
                    <p className="text-white text-sm">{name}</p>
                </div>
                <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
                    <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
                </button>
            </div>
        </div>
    </div>
);

export default Card;
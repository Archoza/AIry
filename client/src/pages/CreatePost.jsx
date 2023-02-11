import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'

import {preview} from "../assets";
import {getRandomPrompt} from '../utils'
import {FormField, Loader} from '../components'

function CreatePost() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
        negativePrompt: ' ',
        steps: 30,
        cfgScale:7,

    })
    const [generatingImg, setGeneratingImg] = useState(false)
    const [loading, setLoading] = useState(false)

    const changeRange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})}

    const generateImage = async () => {
        if (form.prompt) {
            console.log(form)
            try {
                setGeneratingImg(true);
                const response = await fetch('https://airy.onrender.com/api/v1/stable-diffusion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: form.prompt,
                        negativePrompt: form.negativePrompt,
                        steps: form.steps,
                        cfgScale: form.cfgScale,
                    }),
                });
                console.log(response)
                const data = await response.json();


                setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`});
            } catch (err) {
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please provide proper prompt');
        }
    };
    //https://airy.onrender.com
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.prompt && form.photo) {
            console.log(form, 'form')
            setLoading(true)
            try {
                const response = await fetch('https://airy.onrender.com/api/v1/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...form}),
                })

                await response.json()
                navigate('/')

            } catch (err) {
                alert(err)

            } finally {
                setLoading(false)
            }
        } else {
            alert('Please enter a prompt and generate an image')
        }

    }
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})

    }
    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt)
        setForm({...form, prompt: randomPrompt})
    }

    return (
        <div>
            <section className={'max-w-7xl mx-auto'}>


                <div>
                    <h1 className={'font-extrabold text-[#222328] text-[32px]'}>Create</h1>
                    <p className={'mt-2 text-[#666e75] text-[16px] max-w [500px]'}>Create
                        imaginative and visually stunning images through by Stable Diffusion and share them with the
                        community</p>
                </div>
                <form className={'mt-16 max-w-3xl'} onSubmit={handleSubmit}>
                    <div className={'flex flex-col gap-5'}>
                        <FormField lableName={'Your name'}
                                   type={'text'}
                                   name={'name'}
                                   placeholder={'John Doe'}
                                   value={form.name}
                                   handleChange={handleChange}
                        />
                        <FormField lableName={'Prompt'}
                                   type={'text'}
                                   name={'prompt'}
                                   placeholder={'A plush toy robot sitting against a yellow wall'}
                                   value={form.prompt}
                                   handleChange={handleChange}
                                   isSurpriseMe
                                   handleSurpriseMe={handleSurpriseMe}
                        />
                        <FormField lableName={'Negative Prompt (Optional)'}
                                   type={'text'}
                                   name={'negativePrompt'}
                                   placeholder={'A plush toy robot sitting against a yellow wall'}
                                   value={form.negativePrompt}
                                   handleChange={handleChange}

                        />
                        <div>
                            <div className='flex inline-block justify-between'>
                                <div className={''}>
                                    <h4>Steps number: {form.steps}</h4>
                                    <p className={'opacity-60 text-xs'}>How many steps to spend generating (diffusing) your image.</p>
                                    <input
                                        type='range'
                                        name={'steps'}
                                        min={10}
                                        max={50}
                                        step={10}
                                        value={parseInt(form.steps)}
                                        onChange={changeRange}


                                    />
                                </div>
                                <div>
                                    <h4>Cfg Scale: {form.cfgScale}</h4>
                                    <p className={'opacity-60 text-xs'}>Cfg scale adjusts how much the image will be like your prompt. Higher values keep your image closer to your prompt..</p>
                                    <input
                                        type='range'
                                        min={1}
                                        max={12}
                                        step={1}
                                        value={form.cfgScale}
                                        name={'cfgScale'}
                                        onChange={changeRange}

                                    />
                                </div>
                            </div>
                        </div>
                        {/*<RangeSlider  steps={form.steps} cfgScale={form.cfgScale} changeNumberSteps={changeNumberSteps} changeCfgScale={changeCfgScale}/>*/}
                        <div
                            className={'relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg' +
                            ' focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'}>
                            {form.photo ? (
                                <img src={form.photo}
                                     alt={form.prompt}
                                     className={'w-full h-full object-contain'}
                                />
                            ) : (
                                <img src={preview}
                                     alt={'preview'}
                                     className={'w-9/12 h-9/12 object-contain opacity-40'}
                                />
                            )}
                            {generatingImg && (
                                <div className={'absolute inset-0 z-0 ' +
                                'flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg '}>
                                    <Loader/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={'mt-5 flex gap-5'}>
                        <button
                            type={'button'}
                            onClick={generateImage}
                            className={'text-white bg-green-700 font-medium rounded-md' +
                            ' text-sm w-full sm:w-auto px-5 py-2.5 text-center '}
                        >{generatingImg ? 'Generating ...' : 'Generate'}
                        </button>
                    </div>
                    <div className={'mt-10'}>
                        <p className={'mt-2 text-[#666e75] text-[14px]'}>
                            Once you have created the image you want, you can share it with others in the community </p>
                        <button type={"submit"}
                                className={'mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'}

                        >{loading ? 'Sharing ...' : 'Share with the community '}</button>
                    </div>
                </form>
            </section>

        </div>
    );
}

export default CreatePost;
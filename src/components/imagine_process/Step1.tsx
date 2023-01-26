import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import preGeneratedPrompts from '../../lib/prompt_list';

const Step1 = ({ chaneStep, step, setPrompt, prompt }: any) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ prompt: string }>();

  useEffect(() => {
    setValue('prompt', prompt);
  });

  const onSubmit = (data: any) => {
    setPrompt(data.prompt);
    chaneStep(step + 1);
  };

  const setRandomPrompt = () => {
    const randomPrompt =
      preGeneratedPrompts[
        Math.floor(Math.random() * preGeneratedPrompts.length)
      ];
    setValue('prompt', randomPrompt);
    setPrompt(randomPrompt);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-5xl md:text-6xl font-black max-w-5xl mb-12 w-full text-center">
        Que souhaitez vous créer ?
      </h2>
      <div className="w-full flex justify-center flex-col items-center">
        <div className="w-full max-w-4xl">
          <input
            {...register('prompt', { required: true })}
            type="text"
            className={`input input-lg input-bordered w-full max-w-4xl ${
              errors.prompt && 'input-error'
            }`}
            placeholder="Ex: Un chat dans la bouche d'une souris"
          />
          <p className="text-lg text-center md:self-start mt-2">
            Je n&apos;ai pas d&apos;idée,{' '}
            <button
              type="button"
              className="text-primary underline"
              onClick={() => setRandomPrompt()}
            >
              aide moi !
            </button>{' '}
          </p>
        </div>
      </div>
      <div className="flex justify-end w-full max-w-4xl mt-8">
        <button
          type="submit"
          className="btn btn-primary btn-lg w-full md:w-fit"
        >
          Je passe à la suite
        </button>
      </div>
    </form>
  );
};

export default Step1;

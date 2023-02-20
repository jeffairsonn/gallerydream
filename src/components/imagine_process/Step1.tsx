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
      <h2 className="text-5xl md:text-6xl font-title font-black max-w-5xl mb-12 w-full text-center">
        Que souhaitez vous créer ?
      </h2>
      <div className="w-full flex justify-center flex-col items-center">
        <div className="w-full max-w-4xl">
          <textarea
            {...register('prompt', { required: true })}
            className={`input input-lg input-bordered w-full max-w-4xl resize-none h-24	pt-3 ${
              errors.prompt && 'input-error'
            }`}
            placeholder="Entrez votre prompt ici..."
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
      <div className="max-w-4xl mt-24">
        <h2 className="font-title text-3xl mb-4 font-medium">
          Comment ça marche ?
        </h2>
        <p>
          Les prompts sont des phrases courtes qui permettent de donner une idée
          générale à l&apos;intelligence artificielle de ce que vous souhaitez
          créer. Par exemple, vous pourriez écrire &quot;un chat qui joue du
          piano&quot; ou &quot;un paysage de montagne enneigé&quot;. À partir de
          là, l&apos;IA utilise des algorithmes sophistiqués pour générer une
          image qui correspond à votre prompt. La technologie utilisée pour cela
          est appelée DALL-E, qui est un modèle de génération d&apos;images
          neuronales développé par OpenAI. Les résultats sont souvent
          surprenants et peuvent être très créatifs. En utilisant les prompts
          avec GalleryDream, vous pouvez donner vie à vos idées de décoration
          intérieure de manière rapide et facile.
        </p>
      </div>
    </form>
  );
};

export default Step1;

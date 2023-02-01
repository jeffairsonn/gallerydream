import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import axios from 'axios';
import Step1 from '../../components/imagine_process/Step1';
import Navbar from '../../components/Navbar';
import Step2 from '../../components/imagine_process/Step2';
import Step3 from '../../components/imagine_process/Step3';

const create = () => {
  const { status, data }: any = useSession();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (data) {
      axios
        .get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  const [prompt, setPrompt] = useState('');
  const [styles, setStyles] = useState([]);
  const [numberOfImages, setNumberOfImages] = useState(1);

  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const chaneStep = (stepToChange: any) => {
    if (stepToChange === 1) {
      setStep2(false);
      setStep1(true);
      setStep(1);
    }
    if (stepToChange === 2) {
      setStep1(false);
      setTimeout(() => {
        setStep2(true);
        setStep(2);
      }, 150);
    }
    if (stepToChange === 3) {
      setStep1(false);
      setTimeout(() => {
        setStep3(true);
        setStep(3);
      }, 150);
    }
  };

  const generateImages = () => {
    axios
      .post(
        `/api/imagine`,
        {
          prompt,
          styles,
          numberOfImages,
          user: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        }
      )
      .then((res) => {
        router.push(`/imagine/${res.data}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, [step]);
  return (
    <div>
      <Navbar user={user} status={status} />
      <div className="px-4 md:px-8 lg:px-40  gap-4 pb-16 pt-8 space-y-20">
        <div className="items-center flex flex-col justify-center gap-8">
          <ul className="steps">
            <li className={`step ${step >= 1 && 'step-primary'}`}>Décrivez</li>
            <li className={`step ${step >= 2 && 'step-primary'}`}>
              Donnez un style
            </li>
            <li className={`step ${step >= 3 && 'step-primary'}`}>Générez !</li>
          </ul>
          {step === 1 && (
            <Transition
              appear
              show={step === 1 && step1}
              enter="delay-150 transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Step1
                chaneStep={chaneStep}
                step={step}
                setPrompt={setPrompt}
                prompt={prompt}
              />
            </Transition>
          )}
          {step === 2 && (
            <Transition
              show={step === 2 && step2}
              enter="delay-150 transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Step2
                chaneStep={chaneStep}
                step={step}
                styles={styles}
                setStyles={setStyles}
              />
            </Transition>
          )}
          {step === 3 && (
            <Transition
              show={step === 3 && step3}
              enter="delay-150 transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Step3
                chaneStep={chaneStep}
                step={step}
                numberOfImages={numberOfImages}
                setNumberOfImages={setNumberOfImages}
                generateImages={generateImages}
                user={user}
              />
            </Transition>
          )}
        </div>
      </div>
    </div>
  );
};

export default create;

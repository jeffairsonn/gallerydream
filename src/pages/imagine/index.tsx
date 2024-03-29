/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import axios from 'axios';
import Link from 'next/link';
import Step1 from '../../components/imagine_process/Step1';
import Navbar from '../../components/Navbar';
import Step2 from '../../components/imagine_process/Step2';
import Step3 from '../../components/imagine_process/Step3';
import Container from '../../components/Container';
import Step4 from '../../components/imagine_process/Step4';
import FooterNavigation from '../../components/FooterNavigation';

const create = () => {
  const { status, data }: any = useSession();
  const [user, setUser] = useState<any>();

  const alertUser = (e: any) => {
    e.preventDefault();
    e.returnValue = 'Attention, vous allez perdre vos modifications !';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, []);

  useEffect(() => {
    if (data) {
      axios
        .get(`/api/user/verify`, {
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

  const [prompt, setPrompt] = useState('');
  const [styles, setStyles] = useState('');
  const [numberOfImages, setNumberOfImages] = useState(1);

  useEffect(() => {
    if (router.query.prompt) {
      setPrompt(router.query.prompt as string);
    }
  }, [router]);

  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);

  const changeStep = (stepToChange: any) => {
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
    if (stepToChange === 4) {
      setStep1(false);
      setTimeout(() => {
        setStep4(true);
        setStep(4);
      }, 150);
    }
  };

  const generateImages = () => {
    changeStep(4);
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
        router.push(` /creations/${res.data}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, [step]);

  if (status === 'unauthenticated') {
    return (
      <div className="flex h-screen justify-center items-center p-4">
        <div className="p-4 shadow-lg flex flex-col items-center space-y-4 max-w-md">
          <Link href="/" className="max-w-[80px]">
            <img src="/assets/logo_gallery_dream.png" alt="" />
          </Link>
          <h1 className="text-2xl font-bold text-center">
            Connectez-vous pour pouvoir créer des œuvres avec GalleryDream
          </h1>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => router.push('/login')}
          >
            Connexion
          </button>
        </div>
        <FooterNavigation />
      </div>
    );
  }
  return (
    <div>
      <Navbar user={user} status={status} />
      <Container>
        <div className="items-center flex flex-col justify-center gap-8">
          {step < 4 && (
            <ul className="steps">
              <li className={`step ${step >= 1 && 'step-primary'}`}>
                Décrivez
              </li>
              <li className={`step ${step >= 2 && 'step-primary'}`}>
                Donnez un style
              </li>
              <li className={`step ${step >= 3 && 'step-primary'}`}>
                Générez !
              </li>
            </ul>
          )}
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
                chaneStep={changeStep}
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
                chaneStep={changeStep}
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
                chaneStep={changeStep}
                step={step}
                numberOfImages={numberOfImages}
                setNumberOfImages={setNumberOfImages}
                generateImages={generateImages}
                user={user}
              />
            </Transition>
          )}
          {step === 4 && (
            <Transition
              show={step === 4 && step4}
              enter="delay-150 transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Step4 />
            </Transition>
          )}
        </div>
      </Container>
      <FooterNavigation />

      {/* {createGeneratedImage && (
        <div className="bg-black bg-opacity-50 h-full w-full absolute top-0 z-50 flex items-center justify-center">
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src="https://picsum.photos/300/200"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Patientez quelques instants...</h2>
              <p>Vos oeuvres sont pretes dans moins de 30 secondes</p>
              <div className="card-actions">
                <button type="button" className="btn btn-primary loading" />
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default create;

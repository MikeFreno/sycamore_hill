import { type NextPage } from "next";
import Head from "next/head";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Cormorant_Garamond, Josefin_Sans } from "@next/font/google";
import Chevron from "@/icons/chevron";
import { Transition } from "@headlessui/react";
import Image from "next/image";

const corm = Cormorant_Garamond({ weight: "300", subsets: ["latin"] });
const jose = Josefin_Sans({ weight: "300", subsets: ["latin"] });

const Home: NextPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textAccompaniment = [
    "Peaceful surroundings",
    "Beautiful atmosphere",
    "Incredible wine",
  ];
  const images = ["/vines.jpg", "/centered-glass.jpg", "wine-pour.jpg"];
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [sendRes, setSendRes] = useState("");

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameRef.current && emailRef.current && messageRef.current) {
      const response = await fetch(
        `/api/email_send?name=${nameRef.current.value}&email=${emailRef.current.value}&message=${messageRef.current.value}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setSendRes(
          "Email sent successfully! We will get back to you as soon as possible."
        );
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
      } else {
        setSendRes("Failed to send email.");
      }
    }
  };

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(nextImage, 8000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  const slideRight = () => {
    if (currentIndex === 2) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const slideLeft = () => {
    if (currentIndex === 0) {
      setCurrentIndex(2);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <Head>
        <title>Sycamore Hill</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${jose.className} min-h-screen bg-gradient-to-b from-green-200 to-white`}
      >
        <div
          id="navigation-bar"
          className="fixed top-0 flex h-16 w-screen justify-between bg-gradient-to-b from-white to-transparent"
        >
          <div className="my-auto flex justify-start pl-4 text-xl">
            <Image
              src="/cropped-sycamore.png"
              className="h-12 w-12"
              alt={"sycamore-logo"}
              width={48}
              height={48}
            />
            <div className="my-auto pl-4">Sycamore Hill</div>
          </div>
          <div className="my-auto justify-end">
            <ul className="flex">
              <li className="px-4">
                <a
                  id="contact-link"
                  href="#contact"
                  className="underline-offset-4 hover:underline"
                >
                  About / Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-16 pt-16">
          <h1
            className={`${corm.className} py-12 text-center text-5xl italic tracking-wider underline underline-offset-[6px] sm:text-start`}
          >
            Welcome to Sycamore Hill
          </h1>
        </div>
        {images.map((image, index) => (
          <Transition
            key={image}
            show={currentIndex === index}
            enter="transition-opacity duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={`absolute z-50 mt-36 pl-36 italic ${
                currentIndex === 0 ? "text-white" : ""
              } text-4xl`}
            >
              {textAccompaniment[currentIndex]}
            </div>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className={`absolute bottom-0 h-[70vh] w-full object-cover`}
            />
          </Transition>
        ))}
        <div className="absolute right-5 -mt-12 flex h-screen content-center items-center">
          <button onClick={slideRight} id="slide-right">
            <Chevron height={64} width={64} />
          </button>
        </div>
        <div className="absolute left-5 -mt-12 flex h-screen content-center items-center">
          <div className="rotate-180">
            <button onClick={slideLeft} id="slide-left">
              <Chevron height={64} width={64} />
            </button>
          </div>
        </div>
      </main>
      <div className="custom-shape-divider-bottom-1678372099 absolute">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className={`${jose.className} bg-rose-200 px-12 pb-12`} id="contact">
        <h2 className="py-8 text-center text-3xl underline underline-offset-8">
          About Us
        </h2>
        <div className="animate-up-down m-4 my-auto flex min-h-fit w-fit rounded-xl bg-white shadow-lg">
          <div className="">
            <Image
              src="/from-street.jpg"
              className="rounded-l-xl"
              height={240}
              width={240}
              alt={"street-view"}
            />
          </div>
          <address className="flex w-48 items-center justify-center px-4">
            527 Stone Meeting House Rd, Woolwich Township, NJ 08085
          </address>
        </div>
        <div className="flex justify-center pt-8">
          <div className="lg my-auto w-11/12 rounded-lg bg-white p-4 text-black shadow-lg sm:w-5/6 md:w-3/4 lg:w-2/3">
            <div className="text-center text-2xl">Contact Us</div>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={sendMessage}>
              <div className="flex flex-col justify-evenly sm:flex-row">
                <div className="flex flex-col text-center">
                  <div className="pb-2">Name</div>
                  <input
                    ref={nameRef}
                    className="rounded border border-zinc-200 pl-2 lg:w-64"
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col text-center">
                  <div className="pb-2">Email</div>
                  <input
                    ref={emailRef}
                    className="rounded border border-zinc-200 pl-2 lg:w-64"
                    required
                    placeholder="your_email@example.com"
                  />
                </div>
              </div>
              <div className="flex flex-col py-4 text-center lg:px-12">
                <div className="pb-2">Message</div>
                <textarea
                  ref={messageRef}
                  className="rounded border border-zinc-200 px-4"
                  required
                  placeholder=""
                />
              </div>
              <div className="flex justify-end pr-4">
                <button
                  type="submit"
                  className="rounded bg-green-300 px-4 py-2 text-white hover:bg-green-400 active:bg-green-500"
                >
                  Send Message
                </button>
              </div>
            </form>
            <div className="py-2 text-center">{sendRes}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

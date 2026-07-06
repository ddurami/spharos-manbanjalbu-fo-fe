"use client";



import Image from "next/image";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";

import { ApiError } from "@/lib/api/client";

import { loginMember } from "@/lib/api/member";



const UTILITY_LINKS = [

  { label: "아이디 찾기", href: "/find-id" },

  { label: "비밀번호 찾기", href: "/find-password" },

  { label: "회원가입", href: "/signup" },

] as const;



export function LoginForm() {

  const router = useRouter();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [userId, setUserId] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);



  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault();



    if (!userId.trim() || !password || isSubmitting) {

      return;

    }



    setError(null);

    setIsSubmitting(true);



    try {

      const result = await loginMember(userId.trim(), password);

      login(result);

      router.push("/mypage");

    } catch (loginError) {

      setError(

        loginError instanceof ApiError

          ? loginError.message

          : "로그인에 실패했습니다.",

      );

    } finally {

      setIsSubmitting(false);

    }

  }



  return (

    <div className="mx-auto flex w-full max-w-[390px] flex-col bg-white px-6 py-16">

      <div className="flex items-center gap-4">

        <Image

          src="/images/logo.png"

          alt="Starbucks"

          width={56}

          height={56}

          priority

          className="shrink-0"

        />

        <div>

          <h1 className="text-[22px] font-bold leading-8 tracking-tight text-[#222]">

            안녕하세요.

            <br />

            스타벅스입니다.

          </h1>

          <p className="mt-2 text-sm leading-5 text-[#888]">

            회원 서비스 이용을 위해 로그인 해주세요.

          </p>

        </div>

      </div>



      <form

        onSubmit={handleSubmit}

        className="mt-14 flex flex-col"

      >

        <div className="space-y-6">

          <input

            type="text"

            name="userId"

            value={userId}

            onChange={(event) => setUserId(event.target.value)}

            placeholder="아이디"

            autoComplete="username"

            className="w-full border-b border-[#ddd] bg-transparent py-3 text-base text-[#222] outline-none placeholder:text-[#bbb] focus:border-[#00704A]"

          />



          <div className="relative">

            <input

              type={showPassword ? "text" : "password"}

              name="password"

              value={password}

              onChange={(event) => setPassword(event.target.value)}

              placeholder="비밀번호"

              autoComplete="current-password"

              className="w-full border-b border-[#ddd] bg-transparent py-3 pr-10 text-base text-[#222] outline-none placeholder:text-[#bbb] focus:border-[#00704A]"

            />

            <button

              type="button"

              onClick={() => setShowPassword((prev) => !prev)}

              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}

              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#bbb] transition-colors hover:text-[#888]"

            >

              {showPassword ? (

                <Eye className="size-5" />

              ) : (

                <EyeOff className="size-5" />

              )}

            </button>

          </div>

        </div>



        {error && (

          <p className="mt-4 text-sm text-red-500" role="alert">

            {error}

          </p>

        )}



        <nav className="mt-6 flex items-center justify-center gap-2 text-xs text-[#888]">

          {UTILITY_LINKS.map((item, index) => (

            <span key={item.href} className="inline-flex items-center gap-2">

              {index > 0 && (

                <span className="text-[#ddd]" aria-hidden>

                  |

                </span>

              )}

              <Link href={item.href} className="hover:text-[#555]">

                {item.label}

              </Link>

            </span>

          ))}

        </nav>



        <button

          type="submit"

          disabled={isSubmitting}

          className="mt-10 w-full rounded-full bg-[#00704A] py-4 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"

        >

          {isSubmitting ? "로그인 중..." : "로그인하기"}

        </button>

      </form>

    </div>

  );

}



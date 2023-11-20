"use client";

import { Disclosure as Dsclsr } from "@headlessui/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SocialIcon } from "react-social-icons";

import { LoginButton, LogoutButton } from "./LogsButtons";
import classNames from "@/utils/classNames";
import { types } from "@/assets/globals";
import { figtree } from "@/assets/fonts";

export default function Disclosure({ props, MainLogo }) {
  const { signOut, token, userStatus } = props;

  const pathname = usePathname();
  const navigation = [
    {
      name: "ATELIER PASCAUD",
      href: "/creations",
      current: pathname === "/creations",
    },
    {
      name: "CÉRAMIQUES",
      href: `/creations/${types[0].name}?page=1`,
      current: pathname.startsWith("/creations/"),
    },
    {
      name: "ACTUALITÉS",
      href: "/apropos",
      current: pathname.startsWith("/apropos"),
    },
    {
      name: "CONTACT",
      href: "/contact",
      current: pathname.startsWith("/contact"),
    },
  ];
  const adminNavigation = [
    {
      name: "EditArticles",
      href: "/editArticles",
      current: pathname.startsWith("/editArticles"),
    },
  ];

  const isNoHeader = [
    "/",
    "/apropos",
    "/contact",
    "/connect",
    "/editArticles",
  ].some((path) => path === pathname);

  const [scrolled, setScrolled] = useState(0);
  useEffect(() => {
    const getScroll = () => {
      window.addEventListener("scroll", function () {
        const scrollPosition = window.scrollY;
        setScrolled(scrollPosition > 210);
      });
    };
    getScroll();
  }, []);

  return (
    <Dsclsr
      as="nav"
      className={classNames(
        isNoHeader ? "border-b border-terra-800" : "",
        "bg-terra-100 sticky top-0 pt-2 sm:pb-6 sm:block",
        scrolled && !isNoHeader ? "scale-y-0	" : ""
      )}
    >
      {({ open }) => (
        <>
          <div className="w-full sm:w-full flex flex-shrink-0 items-center justify-between sm:justify-center">
            <div className="flex items-center sm:hidden pb-1">
              <Dsclsr.Button className=" items-center justify-center rounded-md p-2 text-terra-800 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Menu principal</span>
                {open ? (
                  <XMarkIcon className="block h-10 w-10" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-10 w-10" aria-hidden="true" />
                )}
              </Dsclsr.Button>
            </div>
            <div>{MainLogo}</div>
            <div className="sm:hidden flex flex-col gap-2 self-start mt-2">
              <SocialIcon
                network="instagram"
                url="https://www.instagram.com/atelier.pascaud/"
                target="_blank"
                bgColor="#4f2516"
                style={{
                  height: "2rem",
                  width: "2rem",
                  marginRight: "1.5rem",
                }}
              />
              <SocialIcon
                network="facebook"
                url="https://www.facebook.com/atelierpascaud"
                target="_blank"
                bgColor="#4f2516"
                style={{ height: "2rem", width: "2rem" }}
              />
            </div>
          </div>
          <div className="hidden sm:block pt-0 mx-auto max-w-7xl px-2 sm:px-6">
            <div className="flex h-16 items-center">
              <div className="flex flex-1 items-center sm:items-stretch justify-start">
                <div className="hidden sm:block self-center">
                  <div className="flex mt-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "border border-terra-800 bg-slate-100 "
                            : "border border-terra-100 hover:border-terra-800",
                          `${figtree.className} rounded-md pl-3 pr-2 py-2 font-light ml-16 text-terra-800 tracking-[.40em] font-light whitespace-nowrap`
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}

                    {userStatus === "Admin" &&
                      adminNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "border border-terra-800 bg-slate-100 "
                              : "border border-terra-100 hover:border-terra-800",
                            `${figtree.className} rounded-md pl-3 pr-2 py-2 font-light ml-16 text-terra-800 tracking-[.40em] font-light whitespace-nowrap`
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                </div>

                <div className="sm:ml-16 self-center flex">
                  <SocialIcon
                    network="instagram"
                    url="https://www.instagram.com/atelier.pascaud/"
                    target="_blank"
                    bgColor="#4f2516"
                    fgColor="#f8e5d5"
                    style={{
                      height: "2rem",
                      width: "2rem",
                      marginRight: "1.5rem",
                    }}
                  />
                  <SocialIcon
                    network="facebook"
                    url="https://www.facebook.com/atelierpascaud"
                    target="_blank"
                    bgColor="#4f2516"
                    fgColor="#f8e5d5"
                    style={{ height: "2rem", width: "2rem" }}
                  />
                </div>

                {!token?.value ? (
                  <LoginButton />
                ) : (
                  <LogoutButton signOut={signOut} />
                )}
              </div>
            </div>
          </div>

          <Dsclsr.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2">
              {navigation.map((item, i) => (
                <span key={item.name}>
                  <Dsclsr.Button
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? "bg-slate-100" : "",
                      `${figtree.className} block px-3 py-3 text-base font-light text-terra-800`
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Dsclsr.Button>
                  {i !== navigation.length - 1 ? (
                    <hr className="border-1 border-terra-800"></hr>
                  ) : null}
                </span>
              ))}
              {userStatus === "Admin" &&
                adminNavigation.map((item) => (
                  <span key={item.name}>
                    <hr className="border-1 border-slate-300"></hr>
                    <Dsclsr.Button
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? "bg-terra-500" : "",
                        "block rounded-md px-3 py-3 text-base font-medium text-slate-100"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Dsclsr.Button>
                  </span>
                ))}
            </div>
          </Dsclsr.Panel>
        </>
      )}
    </Dsclsr>
  );
}

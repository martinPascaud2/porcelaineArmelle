"use client";

import { Disclosure as Dsclsr } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export default function Disclosure({ props, MainLogo }) {
  const { signOut, token, userStatus } = props;
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const pathname = usePathname();
  const navigation = [
    {
      name: "Créations",
      href: "/creations",
      current: pathname.startsWith("/creations"),
    },
    {
      name: "A propos",
      href: "/apropos",
      current: pathname.startsWith("/apropos"),
    },
    {
      name: "Contact",
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

  return (
    <Dsclsr as="nav" className={`bg-terra-600 sticky top-0  sm:block`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center">
              <div className="flex flex-1 relative items-center sm:items-stretch justify-start">
                <div className="flex items-center sm:hidden pb-1">
                  <Dsclsr.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Menu principal</span>
                    {open ? (
                      <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-9 w-9" aria-hidden="true" />
                    )}
                  </Dsclsr.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  {MainLogo}
                </div>
                <div className="hidden sm:block sm:ml-12">
                  <div className="flex space-x-6 mt-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-terra-500 border border-slate-300"
                            : "hover:shadow-button",
                          "rounded-md px-3 py-2 text-sm font-medium text-slate-100"
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
                              ? "bg-terra-500 border border-slate-300"
                              : "hover:shadow-button",
                            "rounded-md px-3 py-2 text-sm font-medium text-slate-100"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                </div>
                {!token?.value ? (
                  <Link
                    href="/connect"
                    className="text-slate-100 hover:bg-terra-700 rounded-md px-3 py-2 text-sm font-medium mb-2 mt-1 absolute right-0"
                  >
                    Se connecter
                  </Link>
                ) : (
                  <LogoutButton signOut={signOut} />
                )}
              </div>
            </div>
          </div>

          <Dsclsr.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-1 pt-2">
              {navigation.map((item, i) => (
                <span key={item.name}>
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
                  {i !== navigation.length - 1 ? (
                    <hr className="border-1 border-slate-300"></hr>
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

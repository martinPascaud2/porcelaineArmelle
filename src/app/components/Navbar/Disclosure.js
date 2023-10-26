"use client";

import { Disclosure as Dsclsr } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
      current: pathname === "/creations",
    },
    { name: "A propos", href: "/apropos", current: pathname === "/apropos" },
    { name: "Contact", href: "/contact", current: pathname === "/contact" },
  ];
  const adminNavigation = [
    {
      name: "EditArticles",
      href: "/editArticles",
      current: pathname === "/editArticles",
    },
  ];
  return (
    <Dsclsr as="nav" className="bg-terra-600 sticky top-0">
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
              {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                Profile dropdown
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        width={500}
                        height={500}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div> */}
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

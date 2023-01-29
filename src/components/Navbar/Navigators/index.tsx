import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import classNames from "@/helpers";
import { useRouter } from "next/router";
import { NavigationProps } from "@/types";
import { authStore } from "@/store";

const ProfileMenu = () => {
  const logout = authStore((state: any) => state.logout);

  const userNavigation = [
    { name: "Your Profile", href: "#", onClick: () => {} },
    { name: "Sign out", href: "#", onClick: logout },
  ];

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
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
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  onClick={item.onClick}
                  href={item.href}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const Navigation: React.FC<NavigationProps> = ({ isLogin }) => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const router = useRouter();

  const navigation = [
    { name: "Home", href: "#", current: currentTab },
    { name: "Team", href: "#", current: currentTab },
    { name: "Contact", href: "#", current: currentTab },
  ];

  return (
    <>
      {navigation.map((item, index) =>
        isLogin ? (
          <a
            key={item.name}
            onClick={() => {
              setCurrentTab(index);
            }}
            className={classNames(
              item.current == index
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </a>
        ) : null
      )}
    </>
  );
};

const NavigationMobile: React.FC<NavigationProps> = ({ isLogin }) => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const router = useRouter();

  const navigation = [
    { name: "Home", href: "#", current: currentTab, isLogin: true },
    { name: "Team", href: "#", current: currentTab, isLogin: true },
    { name: "Contact", href: "#", current: currentTab, isLogin: false },
  ];
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {navigation.map((item, index) =>
          isLogin ? (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              onClick={() => {
                setCurrentTab(index);
              }}
              className={classNames(
                item.current == index
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block px-3 py-2 rounded-md text-base font-medium"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </Disclosure.Button>
          ) : null
        )}
      </div>
    </Disclosure.Panel>
  );
};

export { ProfileMenu, Navigation, NavigationMobile };

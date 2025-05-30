import { useCurrency } from '../context/CurrencyContext'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'

export default function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
        <CurrencyDollarIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
        <span className="ml-2 text-gray-800 dark:text-gray-200 transition-colors duration-200">{currency}</span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-1">
            {Object.keys(currencies).map((code) => (
              <Menu.Item key={code}>
                {({ active }) => (
                  <button
                    onClick={() => setCurrency(code)}
                    className={`${
                      active || currency === code
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-900 dark:text-gray-100'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-150`}
                  >
                    {code} ({currencies[code].symbol})
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
} 
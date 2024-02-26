'use client'
import { clsx } from 'clsx'
import { DevServerConfig } from '@/config'
import { useEffect, useState } from 'react'
import { DocsNotice } from '@/components/DocsNotice'
import { trimHash, EntityTag } from '@peerme/core-ts'
import { Button, Select, Switch } from '@peerme/web-ui'
import { SimulationNotice } from '@/components/SimulationNotice'
import { useExtensionLogin, useGetAccountInfo } from '@multiversx/sdk-dapp/hooks'

type Props = {
  children: any
  onDarkModeChange?: (dark: boolean) => void
  onEntityTagChange?: (tag: EntityTag) => void
}

export const BaseLayout = (props: Props) => {
  const [dark, setDark] = useState(true)
  const { address } = useGetAccountInfo()
  const [initExtensionLogin] = useExtensionLogin({})

  useEffect(() => {
    props.onDarkModeChange?.(dark)

    const docHtmlClassList = document.getElementsByTagName('html')[0].classList
    if (dark) {
      docHtmlClassList.add('dark')
    } else {
      docHtmlClassList.remove('dark')
    }
  }, [dark])

  return (
    <div className={dark ? 'dark bg-gray-800' : 'bg-gray-100'}>
      <div className={clsx('min-h-screen w-screen max-w-4xl mx-auto pb-4')}>
        <header className="px-8 py-4 flex gap-8">
          <div className="flex items-center space-x-2">
            <span className="text-xl text-gray-500">Dark Mode</span>
            <Switch label="Dark Mode" checked={dark} onChange={(val) => setDark(val)} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl text-gray-500">Tag</span>
            <Select onChange={(val) => props.onEntityTagChange?.(val as EntityTag)} className="w-48">
              <option value="-">Select Tag</option>
              {DevServerConfig.AvailableEntityTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center">
            {address ? (
              <a
                href={DevServerConfig.ExplorerUrl + '/accounts/' + address}
                className="text-blue-500 hover:text-blue-400"
                target="noopener"
              >
                {trimHash(address, 8)}
              </a>
            ) : (
              <Button onClick={initExtensionLogin} color="blue" outline>
                Connect via DeFi Extension
              </Button>
            )}
          </div>
        </header>
        <div>
          {!address && <SimulationNotice className="mb-4" />}
          <DocsNotice />
        </div>
        <main className="rounded-2xl mt-8">{props.children}</main>
      </div>
    </div>
  )
}

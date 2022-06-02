import Head from 'next/head'
import Body from '../Components/Body'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
    <Head>
      <title>Daily Expenses</title>
      </Head>
      <div>
      <Body />
      </div>
      </>
  )
}

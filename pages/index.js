import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'

const Home = () => (
  <div>
    <Head>
      <title>Dataline Group Oy | Verkkokaupat yrityksille</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

        <div id="bg">
            <picture>
                <source srcset="/assets/dataline-verkkokauppa-4k.webp 3840 w, /assets/dataline-verkkokauppa-2k.webp 2048w, /assets/dataline-verkkokauppa-768.webp 768w, /assets/dataline-verkkokauppa-450.webp 450w" type="image/webp"/>
                <source srcset="/assets/dataline-verkkokauppa-4k.jpg 3840 w, /assets/dataline-verkkokauppa-2k.jpg 2048w, /assets/dataline-verkkokauppa-768.jpg 768w, /assets/dataline-verkkokauppa-450.jpg 450w" type="image/jpeg"/>
                <img srcset="/assets/dataline-verkkokauppa-4k.jpg 3840 w, /assets/dataline-verkkokauppa-2k.jpg 2048w, /assets/dataline-verkkokauppa-768.jpg 768w, /assets/dataline-verkkokauppa-450.jpg 450w" src="/assets/dataline-verkkokauppa-2k.jpg"/>
            </picture>
        </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
        #bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            z-index: -1;
        }
        .hero img { object-fit: cover }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
)

export default Home

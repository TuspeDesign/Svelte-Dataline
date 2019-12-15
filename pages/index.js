import React from 'react'
import Head from 'next/head'

const Home = () => (
    <div>
        <Head>
            <title>Verkkokauppa yritykselle ja kotisivut urheiluseuralle</title>
            <meta name="theme-color" content="#45558d"/>
            <meta name="description" content="Verkkokauppa yritykselle kotimaiseen ja kansainväliseen kaupankäyntiin sekä joustavat kotisivut urheiluseuralle."/>
            <link rel="image_src" href="https://www.dataline.fi/assets/dataline-verkkokauppa-2k.jpg"/>
            <meta property="og:site_name" content="Dataline Group Oy"/>
            <meta property="og:title" content="Verkkokauppa yritykselle ja kotisivut urheiluseuralle"/>
            <meta property="og:description" content="Verkkokauppa yritykselle kotimaiseen ja kansainväliseen kaupankäyntiin sekä joustavat kotisivut urheiluseuralle."/>
            <meta property="og:url" content="https://www.dataline.fi/"/>
            <meta property="og:image" content="https://www.dataline.fi/assets/dataline-verkkokauppa-2k.jpg"/>
            <meta property="og:image:alt" content="Verkkokauppa yritykselle ja kotisivut urheiluseuralle"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:description" content="{{ site.data.home_fi.desc }}"/>
            <meta name="twitter:title" content="{{ site.data.home_fi.meta_title }}"/>
            <meta name="twitter:site" content="@tuspedesign"/>
            <meta name="twitter:creater" content="@tewdin"/>
            <meta name="twitter:url" content="https://www.dataline.fi/"/>
            <meta name="twitter:image" content="https://www.dataline.fi/assets/dataline-verkkokauppa-2k.jpg"/>
            <meta name="twitter:image:alt" content="Verkkokauppa yritykselle ja kotisivut urheiluseuralle"/>
            <meta property="og:type" content="website"/>
            <link rel="icon" type="image/png" href="https://www.dataline.fi/favicon.png"/>
            <link rel="icon" href="https://www.dataline.fi/favicon.ico" />
            <link rel="canonical" href="https://www.dataline.fi/"/>
            <meta name="format-detection" content="telephone=no"/>
            <link rel="alternate" type="application/atom+xml" href="https://github.com/tewdin/Dataline/commits/master.atom" title="Uusimmat päivitykset sivustolle"/>
        </Head>

        <div id="hero" className="rel">
            <a id="logo" className="abs" href="/" title="Dataline Group Oy" rel="home">Data<span className="blue">line</span></a>
            <picture>
                <source media="(max-width: 450px)" srcset="/assets/dataline-verkkokauppa-450.webp" type="image/webp"/>
                <source media="(max-width: 768px)" srcset="/assets/dataline-verkkokauppa-768.webp" type="image/webp"/>
                <source media="(max-width: 2048px)" srcset="/assets/dataline-verkkokauppa-2k.webp" type="image/webp"/>
                <source media="(min-width: 2049px)" srcset="/assets/dataline-verkkokauppa-4k.webp" type="image/webp"/>
                <source media="(max-width: 450px)" srcset="/assets/dataline-verkkokauppa-450.jpg" type="image/jpg"/>
                <source media="(max-width: 768px)" srcset="/assets/dataline-verkkokauppa-768.jpg" type="image/jpg"/>
                <source media="(max-width: 2048px)" srcset="/assets/dataline-verkkokauppa-2k.jpg" type="image/jpg"/>
                <source media="(min-width: 2049px)" srcset="/assets/dataline-verkkokauppa-4k.jpg" type="image/jpg"/>
                <img src="/assets/dataline-verkkokauppa-2k.jpg" alt="Laadukkaat verkkosivut yritykselle ja urheiluseuralle"/>
            </picture>
            <div id="caption" className="abs cell">
                <h1>Entistä parempi verkkokauppa</h1>
                <div id="sum" className="mb-4">Tarjoamme juuri sinulle parhaat verkkokaupparatkaisut kotimaiseen ja kansainväliseen kaupankäyntiin erittäin kilpailukykyisellä hinnalla ja monen vuoden osaamisella.</div>
                <p><a className="btn inl" href="tel:+358400273150" title="Keskutellaan miten voimme parantaa teidän verkkosivustoa" rel="nofollow noopener">Soita meille</a><a className="btn inl" href="mailto:myynti@dataline.fi" title="Lähetä rohkeasti sähköpostia ja sovitaan tapaaminen" rel="nofollow noopener">Lähetä viesti</a></p>
            </div>
        </div>

        <div id="palvelumme">
            <section id="verkkokaupat" className="pad clip1">
                <div className="container">
                    <div className="row">
                        <div className="col-4 r1 mb-4">
                            <picture>
                                <source srcset="/assets/dataline-verkkokaupat.webp" type="image/webp"/>
                                <source srcset="/assets/dataline-verkkokaupat.jpg" type="image/jpeg"/>
                                <img src="/assets/dataline-verkkokaupat.jpg" alt="Verkkokauppa yritykselle"/>
                            </picture>
                        </div>
                        <div className="col-8 r1 mb-4"><div className="cell">
                            <h2 className="title">Verkkokauppa yritykselle</h2>
                            <p>Meille tärkeää on, että pääset nopeasti ja luotettavasti myymään tuotteitasi uudessa verkkokaupassa. Meiltä löytyy kaikki toiminnot, jotka tarvitset menestyvän verkkokaupan ylläpitämiseen ja kehitämme verkkokauppaa paremmaksi yhdessä asiakkaidemme kanssa. Verkkokauppaan on mahdollista myös integroida toiminnanohjausjärjestelmä, kuten esim. Lemonsoft.</p>
                            <p>Verkkokaupat teemme helppokäyttöisellä ja selkeällä ProcessWire-verkkokauppa-alustalla. Datalinen kotisivut ja verkkokauppa sopivat kaikille toimialoille ravintoloista vaatekauppoihin ja urheiluseuroista tukkukauppoihin.</p>
                            <p>Teemme verkkosivuja, joista olemme ylpeitä!</p>
                        </div></div>
                    </div>
                </div>
            </section>
            <section id="urheiluseurat" className="pad clip2">
                <div className="container">
                    <div className="row rr">
                        <div className="col-4 r1 mb-4">
                            <picture>
                                <source srcset="/assets/dataline-urheiluseurat.webp" type="image/webp"/>
                                <source srcset="/assets/dataline-urheiluseurat.jpg" type="image/jpeg"/>
                                <img src="/assets/dataline-urheiluseurat.jpg" alt="Verkkosivut urheiluseuralle"/>
                            </picture>
                        </div>
                        <div className="col-8 r1 mb-4"><div className="cell">
                            <h2 className="title">Kotisivut urheiluseuralle</h2>
                            <p>Dataline tarjoaa urheiluseuroille monimuotoisen ja helposti päivitettävän urheilualustan. Kattavat perusominaisuudet sisältävät uutiset, joukkuetiedot, videot, kausittaiset ottelut, seuran statiikat, verkkokaupan, aitiovaraukset ja paljon muuta hyödyllistä. Kehitämme sivustoja urheiluseurojen tarpeiden mukaan ja lisäämme vuosittain uusia ominaisuuksia.</p>
                            <p>Kaipaako verkkosivut uudistusta? Ota rohkeasti yhteyttä!</p>
                        </div></div>
                    </div>
                </div>
            </section>
        </div>

        <div id="yhteystiedot" className="clip2">
            <div className="container">
                <div id="yritys" className="tc mb-5">
                    <h2 className="title">Yhteystiedot</h2>
                    <h3>Dataline Group Oy</h3><p>Lehtikuusentie 5,<br/>26100 Rauma<br/>2354053-6</p>
                </div>
                <div className="row">
                    <div id="molentum" className="col-6 r6 tr mb-4">
                        <h3><a href="https://molentum.fi/" target="_blank" title="Molentum Oy - paremman palvelun digitoimisto" rel="noopener">Mika Lähteenmäki</a></h3>
                        <h4>Myynti ja asiakaspalvelu</h4>
                        <p><a href="tel:+358400273150" rel="nofollow noopener">0400 273 150</a><br/><a href="mailto:myynti@dataline.fi" rel="nofollow noopener">myynti@dataline.fi</a></p>
                    </div>
                    <div id="tuspe" className="col-6 r6 mb-4">
                        <h3><a href="https://tuspe.com/" target="_blank" title="Tuspe Design - verkkosivut ja verkkokaupat yritykselle" rel="noopener">Timo Anttila</a></h3>
                        <h4>Tekniset toteutukset</h4>
                        <p><a href="tel:+358407746121" rel="nofollow noopener">040 774 6121</a><br/><a href="mailto:timo@dataline.fi" rel="nofollow noopener">timo@dataline.fi</a></p>
                    </div>
                </div>
            </div>
        </div>

        <a id="whatsapp" href="https://api.whatsapp.com/send?phone=358407746121" title="Dataline WhatsApp - lähetä viesti ja kerro miten voin auttaa" target="_blank" rel="nofollow noopener">
            <picture>
                <source srcset="/assets/dataline-whatsapp.webp" type="image/webp"/>
                <source srcset="/assets/dataline-whatsapp.jpg" type="image/jpeg"/>
                <img src="/assets/dataline-whatsapp.jpg" alt="Verkkosivut urheiluseuralle" width="60" height="60"/>
            </picture>
        </a>

        <style jsx global>{`
			@font-face {
				font-family: 'Montserrat';
				src: local('Montserrat Regular'), local('Montserrat-Regular'),
					url('/assets/Montserrat-Regular.woff2') format('woff2'),
					url('/assets/Montserrat-Regular.woff') format('woff');
				font-weight: 400;
				font-style: normal;
				font-display: swap;
			}
			@font-face {
				font-family: 'Montserrat';
				src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'),
					url('/assets/Montserrat-ExtraBold.woff2') format('woff2'),
					url('/assets/Montserrat-ExtraBold.woff') format('woff');
				font-weight: 900;
				font-style: normal;
				font-display: swap;
			}
            * {
                vertical-align: top;
                text-decoration: none;
                margin: 0;
                padding: 0;
            }
            *,
            :after,
            :before { box-sizing: border-box }
            body {
                width: 100vw;
                overflow-x: hidden;
                line-height: 1.5rem;
                background-color: #2e3141
            }
            body,
            h4 { font: 400 18px Montserrat }
            h1,
            h2,
            h3,
            #logo { font-weight: 800 }
            body,
            a { color: #fff }
            #logo {
                font-size: 2.4rem;
                z-index: 666
            }
            #logo .blue { color: #6db4c8 }
            .rel { position:relative }
            .abs { position:absolute }
            .cell {
                flex-direction: column;
                flex-direction: column;
                justify-content: center;
                width: 100%;
                height: 100%;
            }
            #caption { top: 0 }
            #caption h1 {
                font-size: 4rem;
                line-height: 4.4rem;
                margin-bottom: 10px
            }
            #caption p {
                font-size: 1.4rem;
                line-height: 1.8rem
            }
            .title { font-size: 2.6rem }
            p,
            #palvelumme .title { margin-bottom: 15px }
            p:last-child { margin-bottom: 0 }
            #asiakkaitamme .title,
            #yhteystiedot .title { margin-bottom: 3rem }
            #verkkokaupat { background-color: #4c5c96 }
            #urheiluseurat { background-color: #45558d }
            #asiakkaitamme { background-color: #3f4e85 }
            .container {
                width: 90%;
                max-width: 1330px;
                margin: 0 auto;
                padding: 0 15px
            }
            .cell,
            .row { display: flex }
            .row {
                flex-wrap: wrap;
                margin-right: -15px;
                margin-left: -15px
            }
            .rr { flex-direction: row-reverse }
            .col-3,
            .col-4,
            .col-6,
            .col-8 {
                position: relative;
                width: 100%;
                min-height: 1px;
                padding-right: 15px;
                padding-left: 15px;
                -webkit-box-flex: 0
            }
            .col-3 {
                flex: 0 0 25%;
                max-width: 25%
            }
            .col-4 {
                flex: 0 0 33.3333%;
                max-width: 33.3333%
            }
            .col-6 {
                flex: 0 0 50%;
                max-width: 50%
            }
            .col-8 {
                flex: 0 0 66.6666%;
                max-width: 66.6666%
            }
            .mb-4 { margin-bottom: 20px }
            .mb-5 { margin-bottom: 3rem }
            .tc { text-align: center }
            .inl {
                display: inline-block;
                vertical-align: middle
            }
            #whatsapp {
                display: block;
                width: 60px;
                height: 60px;
                position: fixed;
                bottom: 10px;
                right: 8px;
                z-index: 666
            }
            img,
            .btn { border-radius: 6px }
            img {
                max-width: 100%;
                height: auto
            }
            .btn {
                margin-right: 10px;
                padding: 8px 25px;
                border: 1px solid rgba(255,255,255,.4)
            }
            .btn:hover { background-color: #000 }
            h3 { font-size: 1.2rem }
            @media screen and (min-width:680px){
                #logo {
                    top: 25px;
                    left: 40px;
                    display: inline-block
                }
            }
            @media screen and (min-width:860px){
                .clip1 { clip-path: polygon(0 5%, 100% 0, 100% 100%, 0 95%) }
                .clip2 { clip-path: polygon(0 0, 100% 5%, 100% 95%, 0 100%) }
                .clip1,
                .clip2 { margin-top:-42px }
                .pad { padding: 80px 0 60px }
                #yhteystiedot { padding: 80px 0 30px }
                .tr { text-align: right }
            }
            @media screen and (min-width:1000px){
                #caption {
                    top: 0;
                    left: 10vw;
                    max-width: 630px;
                }
            }
            @media screen and (min-width:1000px){
                .clip1,
                .clip2 { margin-top: -30px }
            }
            @media screen and (max-width:1000px){
                .r1 {
                    flex: 0 0 100%;
                    max-width: 100%;
                }
                .col-4,
                .title,
                #caption { text-align: center }
                #caption {
                    left: 0;
                    padding: 0 10%
                }
            }
            @media screen and (max-width:860px){
                .pad,
                #yhteystiedot { padding: 60px 0 40px }
            }
            @media screen and (max-width:680px){
                .r6 {
                    flex: 0 0 100%;
                    max-width: 100%;
                    text-align: center
                }
                #caption h1 {
                    font-size: 9vw;
                    line-height: 10vw
                }
                .title {
                    font-size: 2rem;
                    line-height: 2.4rem;
                }
                #logo {
                    display: block;
                    top: 20px;
                    left: 0;
                    width: 100%;
                    text-align: center
                }
            }
            @media screen and (max-width:550px){
                #caption .btn {
                    display: block;
                    margin: 0 auto 5px
                }
            }
        `}</style>
    </div>
)

export default Home

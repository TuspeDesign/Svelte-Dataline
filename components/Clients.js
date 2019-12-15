import React from 'react'
import Link from 'next/link'

const links = [
    { href: 'https://sajt.fi/', label: 'SAJT', img: 'tukkuverkkokauppa-sajt' },
    { href: 'https://www.lennol.fi/', label: 'Lennol Oy', img: 'verkkokauppa-lennol' },
    { href: 'https://navyblue.fi/', label: 'Navy Blue Shop', img: 'verkkokauppa-navyblue' },
    { href: 'https://kupilka.fi/', label: 'Kupilka', img: 'verkkokauppa-kupilka' },
    { href: 'https://www.rokihockey.fi/', label: 'Roki Hockey', img: 'urheiluseura-rokihockey' },
    { href: 'https://a-aidat.fi/', label: 'A-Aidat Oy', img: 'verkkosivut-aaidat' },
    { href: 'https://ravintolaexpress.fi/', label: 'Ravintola Express', img: 'verkkokauppa-ravintolaexpress' },
    { href: 'https://www.kurra.fi/', label: 'Kurra Hockey ry', img: 'urheiluseura-kurra' },
    { href: 'https://pkku.fi/', label: 'Pallokerho Keski-Uusimaa', img: 'urheiluseura-pkku' },
    { href: 'https://www.skyxperience.fi/', label: 'SkyXperience', img: 'varauskalenteri-skyxperience' }
].map(link => {
    link.key = `nav-link-${link.href}-${link.label}`
    return link
})

const Clients = () => (
    <div id="asiakkaitamme" className="pad clip1">
        <div className="container tc">
            <h2 className="title">Asiakkaitamme</h2>
            <div id="logot">
                {links.map(({ key, href, label, img }) => (
                    <a key={key} className="inl mb-4" href={href} title={label} rel="noopener">
                        <picture>
                            <source srcset={'/assets/'+ img +'.webp'} type="image/webp"/>
                            <source srcset={'/assets/'+ img +'.png'} type="image/png"/>
                            <img src={'/assets/'+ img +'.png'} alt={label}/>
                        </picture>
                    </a>
                ))}
            </div>
        </div>
    </div>
)

export default Clients
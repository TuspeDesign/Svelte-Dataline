<script>
	let sections = [
		{
			title: "Verkkokauppa yritykselle",
			id: "verkkokaupat",
			img: "palvelumme-verkkokaupat",
			img_desc: "Parempaa verkkokauppaa",
			desc: "<p>Meille tärkeää on, että pääset nopeasti ja luotettavasti myymään tuotteitasi uudessa verkkokaupassa. Meiltä löytyy kaikki toiminnot, jotka tarvitset menestyvän verkkokaupan ylläpitämiseen ja kehitämme verkkokauppaa paremmaksi yhdessä asiakkaidemme kanssa. Verkkokauppaan on mahdollista myös integroida toiminnanohjausjärjestelmä, kuten esim. Lemonsoft.</p><p>Verkkokaupat teemme helppokäyttöisellä ja selkeällä ProcessWire-verkkokauppa-alustalla. Datalinen kotisivut ja verkkokauppa sopivat kaikille toimialoille ravintoloista vaatekauppoihin ja urheiluseuroista tukkukauppoihin.</p><p>Teemme verkkosivuja, joista olemme ylpeitä!</p>",
			button: 1,
			bg: 1,
		},
		{
			title: "Kotisivut urheiluseuralle",
			id: "urheiluseurat",
			img: "palvelumme-urheiluseurat",
			img_desc:
				"Kaunis ja helposti päivitettävä kotisivu urheiluseuralle",
			desc: "<p>Dataline tarjoaa urheiluseuroille monimuotoisen ja helposti päivitettävän urheilualustan. Kattavat perusominaisuudet sisältävät uutiset, joukkuetiedot, videot, kausittaiset ottelut, seuran statiikat, verkkokaupan, aitiovaraukset ja paljon muuta hyödyllistä. Kehitämme sivustoja urheiluseurojen tarpeiden mukaan ja lisäämme vuosittain uusia ominaisuuksia.</p><p>Kaipaako verkkosivut uudistusta? Ota rohkeasti yhteyttä!</p>",
			button: 0,
			bg: 2,
		},
		{
			title: "Palveluja alihankintana",
			id: "kumppanit",
			img: "uudet-kumppanit",
			img_desc: "Haemme uusia yhteistyökumppaneita",
			desc: "<p>Tarvitseeko asiakkaanne verkkosivustoja tai mobiilisovelluksia, mutta se ei ole teidän omaa ydinbisnestänne? Olemme mieluusti kumppaninne, emme kilpailija.</p><p>Tarjoamme mahdollisuutta yhteistyöhön mm. verkkokaupoissa ja urheilussa. Haemme uusia yhteistyökumppaneita, joille voisimme tarjota tuotteitamme ja palveluitamme reilulla kumppanialennuksella. Vahvuuksiamme ovat kokemus, kilpailukykyiset hinnat, nopeat toimitusajat ja erittäin hyvä asiakaspalvelu.</p>",
			button: 2,
			bg: 1,
		},
	];
	let contact = [
		{
			id: "tuspe",
			link: "https://tuspe.com/",
			link_title:
				"Tuspe Design - verkkosivut ja verkkokaupat yritykselle",
			name: "Timo Anttila",
			job: "Myynti ja toteutukset",
			phone: "040 774 6121",
			phone_link: "+358407746121",
			email: "timo@dataline.fi",
		},
		{
			id: "molentum",
			link: "https://molentum.fi/",
			link_title: "Molentum Oy - paremman palvelun digitoimisto",
			name: "Mika Lähteenmäki",
			job: "Myynti ja asiakaspalvelu",
			phone: "010 319 2727",
			phone_link: "+358103192727",
			email: "myynti@dataline.fi",
		},
	];
	let shop = [
		{
			title: "NavyBlue Shop",
			what: "Verkkokauppa, Lemonsoft",
			url: "https://navyblue.fi/",
			img: "processwire-navyblue-2020",
		},
		{
			title: "Lennol Oy",
			what: "Verkkokauppa, Lemonsoft",
			url: "https://www.lennol.fi/",
			img: "processwire-lennol-2019",
		},
		{
			title: "Omamuutto",
			what: "Verkkokauppa, vuokraus",
			url: "https://omamuutto.fi/",
			img: "processwire-omamuutto-2020",
		},
	];
	let references;
</script>

<a id="logo" href="/" rel="home">
	<source srcset="/images/dataline-logo.webp" type="image/webp" />
	<source srcset="/images/dataline-logo.png" type="image/png" />
	<img
		src="/images/dataline-logo.png"
		alt="Dataline Group Oy"
		width="135"
		height="27"
	/>
</a>

{#if references}
	<div id="references">
		<div class="container tc">
			<div id="info">
				<h1>Toteutettuja projektejamme</h1>
				<p>
					Haluatko nähdä lisää referenssejä?<br />Ota yhteyttä
					<a href="mailto:timo@dataline.fi" rel="nofollow"
						>timo@dataline.fi</a
					>.
				</p>
			</div>
			<div class="row">
				{#if references == "verkkokaupat"}
					{#each shop as item}
						<a
							class="col-4 r12 mb"
							href={item.url}
							title={item.title}
							target="_blank"
							rel="noopener"
						>
							<figure>
								<picture>
									<source
										srcset={"/images/ref-" +
											item.img +
											".webp"}
										type="image/webp"
									/>
									<source
										srcset={"/images/ref-" +
											item.img +
											".jpg"}
										type="image/jpeg"
									/>
									<img
										src={"/images/ref-" + item.img + ".jpg"}
										alt={item.title}
									/>
								</picture>
								<figcaption class="caption">
									<h2>{item.title}</h2>
									<h3>{item.what}</h3>
								</figcaption>
							</figure>
						</a>
					{/each}
				{/if}
			</div>
		</div>
		<button id="close" on:click={() => (references = "")}
			><div class="cell">X</div></button
		>
	</div>
{:else}
	<div id="hero">
		<div id="caption" class="cell">
			<div id="caption_inner">
				<h1>Entistä parempi verkkokauppa</h1>
				<div id="sum" class="mb-4">
					Tarjoamme juuri sinulle parhaat verkkokaupparatkaisut
					kotimaiseen ja kansainväliseen kaupankäyntiin erittäin
					kilpailukykyisellä hinnalla ja monen vuoden osaamisella.
				</div>
				<div id="buttons">
					<a
						class="btn"
						href="tel:+358407746121"
						title="Keskutellaan miten voimme parantaa teidän verkkosivustoa"
						rel="nofollow noopener">Soita meille</a
					>
					<a
						class="btn"
						href="mailto:timo@dataline.fi"
						title="Lähetä rohkeasti sähköpostia ja sovitaan tapaaminen"
						rel="nofollow noopener">Lähetä viesti</a
					>
				</div>
			</div>
		</div>
	</div>

	{#each sections as item}
		<section id={item.id} class={"big bg" + item.bg}>
			<div class="container py">
				<div class="row">
					<div class="col-4 r1">
						<picture>
							<source
								srcset={"/images/" + item.img + "-320.webp"}
								type="image/webp"
							/>
							<source
								srcset={"/images/" + item.img + "-320.jpg"}
								type="image/jpeg"
							/>
							<img
								class="img"
								src={"/images/palvelumme-" +
									item.id +
									"-320.jpg"}
								alt={item.img_desc}
							/>
						</picture>
					</div>
					<div class="col-8 r1">
						<div class="cell">
							<h2>{item.title}</h2>
							{@html item.desc}
							{#if item.button > 0}
								{#if item.button == 1}
									<div class="references">
										<button
											class="btn"
											on:click={() =>
												(references = item.id)}
											>Referenssit</button
										>
									</div>
								{:else}
									<div id="buttons">
										<a
											class="btn"
											href="tel:+358407746121"
											title="Mietitään miten voisimme auttaa teitä"
											rel="nofollow noopener"
											>Soita meille</a
										>
										<a
											class="btn"
											href="mailto:timo@dataline.fi"
											title="Lähetä rohkeasti sähköpostia ja sovitaan tapaaminen"
											rel="nofollow noopener"
											>Lähetä viesti</a
										>
									</div>
								{/if}
							{/if}
						</div>
					</div>
				</div>
			</div>
		</section>
	{/each}

	<section id="yhteystiedot" class="big tc">
		<div class="container py">
			<h2>Yhteystiedot</h2>
			<div id="yritys" class="rmb">
				<h3>Dataline Group Oy</h3>
				<p>Petäjäpolku 11-15,<br />37310 Nokia<br />2354053-6</p>
			</div>
			<div class="row">
				{#each contact as item}
					<div id={item.id} class="col-6 rmb">
						<h3>
							<a
								href={item.link}
								target="_blank"
								title={item.link_title}
								rel="noopener">{item.name}</a
							>
						</h3>
						<p>
							{item.job}<br /><a
								href={"tel:" + item.phone_link}
								rel="nofollow noopener">{item.phone}</a
							><br /><a
								href={"mailto:" + item.mail}
								rel="nofollow noopener">{item.email}</a
							>
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<div id="bg">
		<picture>
			<source
				srcset="/images/dataline-667.webp 667w,/images/dataline-768.webp 768w,/images/dataline-1080.webp 1080w"
				type="image/webp"
			/>
			<source
				srcset="/images/dataline-667.jpg 667w,/images/dataline-768.jpg 768w,/images/dataline-1080.jpg 1080w"
				type="image/jpg"
			/>
			<img
				src="/images/dataline-1080.jpg"
				alt="Verkkosivut yritykselle nopeasti ja ammattitaidolla"
			/>
		</picture>
	</div>
{/if}

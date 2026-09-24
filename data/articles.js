/* ============================================================
   GRĂDINA NOASTRĂ — data/articles.js
   Adaugă articole noi la ÎNCEPUTUL array-ului (cel mai nou primul).
   ============================================================ */

const ARTICLES = [

  {
    id: "An-de-experiment",
    title: "In acest an de permacultură: ce o să descoperim",
    date: "2026-09-06",
    category: "Permacultura",
    tags: ["permacultură", "sol viu", "observație", "lecții", "recoltă"],
    image: "images/gradina_ansamblu.jpg",
    author: "Laura",
    heroPosition: "center 50%",
    series: "Anul 2 de experiment",
    excerpt: "Un an întreg, de la sădit la recoltă: ce am semănat, cum a crescut și ce ne-a dat înapoi grădina — fără efort mare.",
    content: `
      <p>Și anul acesta am vrut să vedem dacă pământul dă roade fără să fie lucrat — fără unelte, fără intervenții, doar acoperit cu paie de la plantat până la cules.</p>

      <h3>🌱 Semănat</h3>
      <p>Am extins puțin față de primul an. Solul, hrănit ani la rând din fân depozitat, era gata pentru mai mult. Am pus:</p>
      <ul>
        <li>🥔 <strong>Cartofi</strong></li>
        <li>🧅 <strong>Ceapă</strong></li>
        <li>🍅 <strong>Roșii</strong></li>
        <li>🌿 <strong>Țelină</strong></li>
        <li>🥒 <strong>Dovlecei</strong></li>
        <li>🫛 <strong>Mazăre</strong></li>
      </ul>

      <h3>🌿 Crescut</h3>
      <p>Am vrut să intervenim cât mai puțin. Am privit mai mult decât am făcut — și tot ce părea buruiană avea, de fapt, un rost: pătlagina ne spunea că solul e bătătorit pe alocuri, urzica ne spunea unde e azot din belșug.</p>
      <p>Cea mai mare lecție a fost simplă: solul contează mai mult decât planta.</p>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(140px, 1fr)); gap:10px; margin:1.5rem 0;">
        <figure style="margin:0; text-align:center;">
          <img src="images/mazare_mica.jpg" alt="Mazăre tânără" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Mazăre</figcaption>
        </figure>
        <figure style="margin:0; text-align:center;">
          <img src="images/fasole_mica.jpg" alt="Fasole tânără" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Fasole</figcaption>
        </figure>
        <figure style="margin:0; text-align:center;">
          <img src="images/dovlecei_mic.jpeg" alt="Dovlecel tânăr" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Dovlecei</figcaption>
        </figure>
        <figure style="margin:0; text-align:center;">
          <img src="images/cartofi_primul_an.jpg" alt="Cartofi în creștere" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Cartofi</figcaption>
        </figure>
      </div>

      <h3>🍂 Recoltă</h3>
      <p>Toamna a venit cu dovlecei cât brațul, ardei iuți în ciorchine, roșii coapte lângă gălbenele și câteva găleți de cartofi. Fără sapă, fără îngrășăminte — doar timp, apă și căldură.</p>

      <figure style="margin:1.8rem 0;">
        <img src="images/cartofi_rod.jpg" alt="Trei cartofi scoși din pământ" style="width:100%; height:300px; object-fit:cover; object-position:62% 78%; border-radius:12px; display:block;" />
        <figcaption style="font-size:0.85rem; margin-top:6px; text-align:center; opacity:0.75;">Primii trei, scoși cu mâna din pământul de sub fân</figcaption>
      </figure>

      <figure style="margin:1.5rem 0;">
        <video controls preload="none" playsinline poster="images/cartof_scoatere_poster.jpg" style="width:100%; max-width:340px; display:block; margin:0 auto; border-radius:12px;">
          <source src="images/cartof_scoatere.mp4" type="video/mp4">
        </video>
        <figcaption style="font-size:0.85rem; margin-top:6px; text-align:center; opacity:0.75;">Surprize de sub paie</figcaption>
      </figure>

      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(140px, 1fr)); gap:10px; margin:1.5rem 0;">
        <figure style="margin:0; text-align:center;">
          <img src="images/mazare_rod.jpg" alt="Mazăre în păstăi" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Mazăre</figcaption>
        </figure>
        <figure style="margin:0; text-align:center;">
          <img src="images/fasole_rod.jpg" alt="Fasole culeasă" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Fasole</figcaption>
        </figure>
        <figure style="margin:0; text-align:center;">
          <img src="images/rosii_mari2.jpg" alt="Roșii coapte" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Roșii</figcaption>
        </figure>
        <figure style="margin:0; text-align:center;">
          <img src="images/dovlecei_mari.jpg" alt="Dovlecei mari" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Dovlecei</figcaption>
        </figure>
        <figure style="margin:0; text-align:center;">
          <img src="images/dovlecei_cultura2.jpg" alt="Cultura de dovlecei" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Dovleceii vedeta sezonului</figcaption>
        </figure>
        <figure style="margin:0; text-align:center;">
          <img src="images/ardei_iute_mare.jpg" alt="Ardei iuți" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Ardei iuți</figcaption>
        </figure>
        <figure style="margin:0; text-align:center;">
          <img src="images/ceapa.jpg" alt="Ceapă" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Ceapă</figcaption>
        </figure>
        <figure style="margin:0; text-align:center;">
          <img src="images/telina_mare.jpg" alt="Țelină" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Țelină</figcaption>
        </figure>
      </div>

      <p>Cel mai frumos lucru n-a fost recolta, ci copiii care treceau singuri pe la grădina lor, să vadă ce-a mai crescut.</p>
      `
  },
  
  {
    id: "plante-companion",
    title: "Plante companion: cine se înțelege bine în grădină",
    date: "2026-09-01",
    category: "Permacultura",
    tags: ["plante companion", "biodiversitate", "legume", "permacultură"],
    image: "images/rosii_mari_galbenele.jpg",
    author: "Laura",
    excerpt: "Unele plante se ajută reciproc când cresc împreună. Iată cum folosim asocierile de plante în grădina pentru recolte mai bune și mai puțini dăunători.",
    content: `
      <p>Una dintre cele mai frumoase lecții pe care ni le-a oferit grădina este că plantele, la fel ca oamenii, se înțeleg mai bine cu unii vecini decât cu alții.</p>
      <h3 style="color:#2d6a4f">🌿 Ce sunt plantele companion?</h3>
      <p>Plantele companion sunt plante care, crescând împreună, se ajută reciproc — prin respingerea dăunătorilor, atragerea polenizatorilor, îmbogățirea solului sau oferirea de umbră protectoare.</p>
      <h3 style="color:#2d6a4f">🌽🫘🎃 Trio-ul celor 3 surori</h3>
      <p>Cea mai veche asociere cunoscută vine de la nativii americani:</p>
      <ul>
        <li><strong style="color:#e76f00">🌽 Porumb</strong> — oferă suport fasolei să urce</li>
        <li><strong style="color:#4a7c3f">🫘 Fasole</strong> — fixează azotul în sol pentru toate trei</li>
        <li><strong style="color:#f4a261">🎃 Dovleac</strong> — acoperă pământul, păstrează umezeala și ține buruienile la distanță</li>
      </ul>
      <h3 style="color:#2d6a4f">🍅🌿 Roșii și busuioc</h3>
      <ul>
        <li><strong style="color:#e63946">🍅 Roșiile</strong> cresc mai sănătoase lângă busuioc</li>
        <li><strong style="color:#4a7c3f">🌿 Busuiocul</strong> respinge insectele dăunătoare și îmbunătățește gustul roșiilor</li>
      </ul>
      <h3 style="color:#2d6a4f">🥕🧅 Morcovi și ceapă</h3>
      <ul>
        <li><strong style="color:#e76f00">🥕 Morcovul</strong> respinge musca cepei</li>
        <li><strong style="color:#a8c5a0">🧅 Ceapa</strong> respinge musca morcovului</li>
      </ul>
      <p>Plantate împreună, se protejează reciproc fără niciun pesticid!</p>
      <h3 style="color:#2d6a4f">🌸 Flori printre legume</h3>
      <ul>
        <li><strong style="color:#f4a261">🌼 Gălbenelele</strong> — atrag albinele și țin afidele la distanță</li>
        <li><strong style="color:#8b5cf6">💜 Lavanda</strong> — respinge dăunătorii și parfumează grădina</li>
        <li><strong style="color:#4a7c3f">🌿 Menta</strong> — ține departe furnicile și purecii de pământ</li>
      </ul>
      <h3 style="color:#2d6a4f">💡 Sfatul nostru</h3>
      <p>Nu ai nevoie de o grădină perfectă ca să aplici principiul plantelor companion. Începe simplu: plantează busuioc lângă roșii și gălbenele la marginea grădinii. Natura face restul.</p>
    `
  },
    {
    id: "ciuperca-din-gradina",
    title: "Ciuperca din grădină — un semn că solul tău e viu",
    date: "2026-06-03",
    category: "Viața din grădină",
    tags: ["ciuperci", "sol viu", "cartofi", "permacultură", "biodiversitate"],
    image: "images/ciuperca.jpeg",
    author: "Laura",
    heroPosition: "center 80%",
    excerpt: "Într-o dimineață, printre rândurile de cartofi, am găsit o mică surpriză: o ciupercă albă, delicată, crescută din pământul nostru. Un semn mic, dar cu o poveste mare.",
    content: `
      <p>Eram în grădină, controlând rândurile de cartofi, când am văzut-o. Mică, albă, cu pălăria conică și piciorușul subțire — o ciupercă crescută chiar printre plantele noastre de cartofi.</p>
      <img src="images/ciuperca.jpeg" alt="Ciupercă crescută printre cartofi" style="width:100%; border-radius:12px; margin:1.5rem 0;" />
      <h3>🍄 Ce fel de ciupercă e?</h3>
      <p>După formă și culoare, seamănă cu o Lepiota sau Marasmius — ciuperci mici care cresc în sol bogat în materie organică.</p>
      <h3>🌱 Ce înseamnă o ciupercă în grădină?</h3>
      <p>Ciupercile nu cresc oriunde. Ele apar acolo unde există <strong>miceliu activ</strong> — rețeaua invizibilă de fire fungice care trăiește în sol și descompune materia organică în nutrienți disponibili pentru plante.</p>
      <p>Cu alte cuvinte: dacă ai ciuperci în grădină, solul tău e <strong>viu și sănătos</strong>.</p>
      <h3>💡 Concluzia noastră</h3>
      <p>Am lăsat ciuperca în pace. E parte din ecosistemul grădinii noastre — un mic indicator că mergem pe drumul cel bun. 🍄</p>
    `
  },
  {
    id: "omida-sfingida-cartof",
    title: "Omida sfingidă pe cartofi: prieten sau dușman?",
    date: "2026-05-15",
    category: "Viața din grădină",
    tags: ["insecte", "cartofi", "permacultură", "biodiversitate"],
    image: "images/omida.jpeg",
    author: "Laura",
    excerpt: "Am descoperit pe plantele de cartofi o creatură impresionantă — omida sfingidă. Mare, verde, cu marcaje fascinante. Ce facem cu ea în grădina de permacultură?",
    content: `
      <p>Era o dimineață obișnuită de iulie când, controlând plantele de cartofi, am dat peste ea: o omidă uriașă, aproape cât degetul meu, de un verde intens cu marcaje albastre și galbene pe corp.</p>

      <figure style="margin:1.8rem 0;">
        <img src="images/omida_intreaga.jpg" alt="Omida văzută de sus" style="width:100%; max-width:420px; display:block; margin:0 auto; border-radius:12px;" />
        <figcaption style="font-size:0.85rem; margin-top:6px; text-align:center; opacity:0.75;">Verde, turcoaz și galben — cât un deget de mare</figcaption>
      </figure>

      <p>Primul impuls a fost să o scot. Dar am stat și m-am uitat la ea. Era atât de frumoasă, atât de vie, atât de perfectă în felul ei.</p>

      <h3>Ce este omida sfingidă?</h3>
      <p>Omida sfingidă este larva unui fluture sfinx — un fluture nocturn elegant, cu aripi late care poate zbura ca o colibri. În grădina de permacultură, prezența ei este un semn de biodiversitate activă.</p>

      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(140px, 1fr)); gap:10px; margin:1.5rem 0;">
        <figure style="margin:0; text-align:center;">
          <img src="images/omida_profil.jpg" alt="Omida din profil" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Din profil</figcaption>
        </figure>
        <figure style="margin:0; text-align:center;">
          <img src="images/omida_detaliu.jpg" alt="Fața omizii, în detaliu" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Fața omizii, de aproape</figcaption>
        </figure>
        <figure style="margin:0; text-align:center;">
          <img src="images/omida_pe_tulpina.jpg" alt="Făcând cunoștință" style="width:100%; height:150px; object-fit:cover; border-radius:10px;" />
          <figcaption style="font-size:0.8rem; margin-top:4px; opacity:0.75;">Făcând cunoștință</figcaption>
        </figure>

      </div>

      <h3>Decizia noastră</h3>
      <p>Am ales să o lăsăm. Am mutat-o pe o plantă mai puternică, i-am urmărit evoluția zilnic împreună cu copiii. Timp de două săptămâni a fost cea mai fascinantă lecție de biologie pe care o puteam oferi.</p>

      <figure style="margin:1.5rem 0;">
        <video controls preload="none" playsinline poster="images/omida_video_poster.jpg" style="width:100%; max-width:340px; display:block; margin:0 auto; border-radius:12px;">
          <source src="images/omida_video.mp4" type="video/mp4">
        </video>
        <figcaption style="font-size:0.85rem; margin-top:6px; text-align:center; opacity:0.75;">Omida, în mișcare</figcaption>
      </figure>

      <p>Grădina nu este un sistem steril — este un ecosistem viu, unde fiecare creatură are rolul ei.</p>
    `
  },
    {
    id: "in-nori",
    title: "În nori — cerul de deasupra grădinii noastre",
    date: "2026-05-27",
    category: "În nori",
    tags: ["nori", "apus", "natură", "cer", "peisaj"],
    image: "images/explozie_nori1.jpeg",
    author: "Laura",
    excerpt: "Uneori, cele mai frumoase momente din grădină nu sunt la nivelul solului — ci deasupra lui. Iată cerul nostru, în toată splendoarea lui.",
    content: `
      <p>Grădina ne-a învățat să privim în jos — la sol, la plante, la rădăcini. Dar uneori, cea mai mare frumusețe e deasupra noastră.</p>
      <p>Serile aduc la noi un spectacol unic — nori imenși, aprinși de apus, care se ridică deasupra munților ca niște turnuri de lumină.</p>
      <img src="images/explozie_nori1.jpeg" alt="Nori apus" style="width:100%; border-radius:12px; margin:1.5rem 0;" />
      <img src="images/explozie_nori2.jpeg" alt="Apus peste munți" style="width:100%; border-radius:12px; margin:1.5rem 0;" />
      <img src="images/explozie_nori3.jpeg" alt="Cerul de seară" style="width:100%; border-radius:12px; margin:1.5rem 0;" />
      <h3>🌤️ De ce fotografiem norii?</h3>
      <p>Pentru că ne amintesc că suntem mici — și asta e un lucru bun. E un privilegiu să trăiești într-un loc unde poți vedea orizontul liber și unde apusul nu e blocat de clădiri. 🌅</p>
    `
  },
  {
    id: "gradina-cu-copii",
    title: "Cum să faci grădinărit cu copiii mici",
    date: "2024-05-20",
    category: "Copii & Natură",
    tags: ["copii", "grădinărit", "activități", "natură"],
    image: "images/copii_in_livada.jpeg",
    author: "Laura",
    excerpt: "Nu e nevoie de o grădină perfectă — e nevoie de răbdare, curiozitate și acceptarea că picioarele vor fi mereu murdare de pământ bun.",
    content: `
      <p>Când am decis să implicăm copiii în grădină, cea mai mare teamă a mea era că nu vor fi interesați. M-am înșelat complet.</p>

      <h3>Copiii și pământul — o conexiune naturală</h3>
      <p>Există ceva primar în relația unui copil cu pământul. Nu trebuie să îi înveți să atingă, să sape, să miroase. O fac instinctiv.</p>

      <h3>Activități potrivite pe vârste</h3>
      <p><strong>2–4 ani:</strong> Udat din stropitoare mică, cules recolta.</p>

      <figure style="margin:1.5rem 0;">
        <img src="images/manute_fragute.jpg" alt="Mânuțe culegând frăguțe" style="width:100%; max-width:460px; display:block; margin:0 auto; border-radius:12px;" />
        <figcaption style="font-size:0.85rem; margin-top:6px; text-align:center; opacity:0.75;">Culesul frăguțelor — prima recoltă a celor mici</figcaption>
      </figure>

      <p><strong>5–7 ani:</strong> Plantat semințe, recoltat legume coapte, observat insecte cu lupa.</p>
      <p><strong>8+ ani:</strong> Responsabilitate proprie — o zonă a lor, un proiect al lor.</p>

      <h3>Partea creativă</h3>
      <p>De pe la 6 ani încolo, grădina nu mai e doar de îngrijit — devine și un loc de făcut frumos. O buturugă veche se transformă în jardinieră, pietrele adunate primăvara ajung bordură, iar florile se aranjează după culori, nu după reguli.</p>

      <figure style="margin:1.5rem 0;">
        <img src="images/flor_in_buturuga.jpg" alt="Flori plantate într-o buturugă" style="width:100%; max-width:460px; display:block; margin:0 auto; border-radius:12px;" />
        <figcaption style="font-size:0.85rem; margin-top:6px; text-align:center; opacity:0.75;">O buturugă devenită ghiveci</figcaption>
      </figure>

      <p>E genul de activitate în care copilul hotărăște singur cum arată rezultatul — și tocmai de aceea ține la el.</p>

      <h3>Ce câștigă copiii</h3>
      <p>Dincolo de cunoștințele despre natură, grădina le oferă copiilor ceva mai profund: experiența că efortul duce la rezultate vizibile. Asta nu se predă — se trăiește.</p>
      <p>Și da, pantofii vor fi mereu murdari. Merită din plin.</p>
    `
  },
    {
    id: "fetita-sapa-capsuni",
    title: "Micuța grădinăriță — primii stoloni de căpșuni",
    date: "2026-05-01",
    category: "Copii & Natură",
    tags: ["copii", "căpșuni", "plantat", "permacultură", "1 mai"],
    image: "images/capsuna.jpeg",
    author: "Laura",
    excerpt: "De 1 Mai, o fetiță hotărâtă a plantat primii stoloni de căpșuni din grădină. Și ne-a dat ocazia să explicăm de ce, deși nu săpăm, tot deschidem pământul din când în când.",
    content: `
      <p>De 1 Mai 2026, grădina noastră a avut un oaspete special — Ana, o fetiță plină de curaj, care a hotărât că vrea să planteze căpșuni. Și nu a stat pe gânduri.</p>

      <h3>🍓 Doi stoloni și un loc pentru ei</h3>
      <p>Am dat iarba la o parte, am deschis pământul cât să încapă rădăcinile, am așezat stolonii și am pus paiele  peste ei.</p>

      <figure style="margin:1.5rem 0;">
        <video autoplay muted loop playsinline style="width:100%; max-width:340px; display:block; margin:0 auto; border-radius:12px;">
          <source src="images/sapat.mp4" type="video/mp4">
        </video>
        <figcaption style="font-size:0.85rem; margin-top:6px; text-align:center; opacity:0.75;">Face loc pentru stolonii de căpșuni</figcaption>
      </figure>

      <h3>🌱 De ce nu săpăm, dar tot deschidem pământul</h3>
      <p>În grădina noastră nu întoarcem solul și nu-l lăsăm niciodată gol — paiele stau peste el tot anul. Dar fiecare plantă are nevoie de un loc al ei.</p>
      <p>E o nuanță mică, dar exact ea face metoda să funcționeze.</p>

      <img src="images/capsuna.jpeg" alt="Căpșuni plantate" style="width:100%; border-radius:12px; margin:1.5rem 0;" />

      <h3>💡 Ce am învățat în ziua aceea</h3>
      <p>Copiii nu au nevoie de instrucțiuni complicate. Au nevoie de un colț de pământ, o unealtă pe măsura lor și permisiunea de a face lucrurile singuri. Restul vine de la sine. 🍓</p>
    `
  }

];

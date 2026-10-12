import catEyes from "../assets/cat-eyes.jpg"
import catFace from "../assets/cat-face.jpg"
import catFaceBlush from "../assets/cat-face-blush.jpg"
import catLips from "../assets/cat-lips.jpg"
import catSkin from "../assets/cat-skin.jpg"
import heroEditorial from "../assets/hero-editorial.jpg"

// Informações extras usadas só na página de detalhes.
// A chave é o slug do produto (o mesmo que aparece na URL: /produto/:slug).
// Quando o frontend for integrado à API, estes dados virão do backend
// (GET /api/products/:slug) e este arquivo pode ser removido.
const productDetails = {
    "soft-glow-blush": {
        shortDescription: "Blush em pó sedoso com brilho leve e cor construível.",
        description:
            "Um pó ultrafino que se dissolve na pele e entrega aquele rubor natural de fim de tarde. A cor é construível: uma camada para o efeito quase-nada, três para o look editorial.",
        benefits: [
            "Cor construível, de natural a intensa",
            "Longa duração, sem craquelar",
            "Acabamento sedoso com brilho leve",
        ],
        howToUse:
            "Com um pincel macio, aplique nas maçãs do rosto e esfume em direção às têmporas. Repita para intensificar.",
        ingredients: "Mica, Silica, Dimethicone, Vitamina E.",
        shades: [
            { code: "01", name: "Cherry", hex: "#B5192F" },
            { code: "02", name: "Burgundy", hex: "#8F0026" },
            { code: "03", name: "Flame", hex: "#F33F0A" },
            { code: "04", name: "Petal", hex: "#FFCFE2" },
        ],
        gallery: [catFaceBlush, catLips, catEyes, catSkin],
    },
    "velvet-skin-foundation": {
        shortDescription: "Base líquida de cobertura média e acabamento aveludado.",
        description:
            "Uma base leve que uniformiza a pele sem pesar. A cobertura é média e construível, com toque de veludo e controle de oleosidade ao longo do dia.",
        benefits: [
            "Cobertura construível",
            "Controle de oleosidade",
            "FPS 20",
        ],
        howToUse:
            "Aplique do centro do rosto para fora, com esponja ou pincel, em camadas finas.",
        ingredients: "Water, Cyclopentasiloxane, Titanium Dioxide, Glycerin.",
        shades: [
            { code: "01", name: "Fair", hex: "#F9E4D6" },
            { code: "02", name: "Light", hex: "#F0D0B8" },
            { code: "03", name: "Medium", hex: "#E0B090" },
            { code: "04", name: "Tan", hex: "#C89068" },
            { code: "05", name: "Deep", hex: "#A06040" },
        ],
        gallery: [catFace, catSkin, catFaceBlush, heroEditorial],
    },
    "cherry-kiss-lip-tint": {
        shortDescription: "Tint labial de cor vibrante e longa duração.",
        description:
            "Um tint confortável que deixa os lábios com cor vibrante e aspecto de brilho natural. Fácil de aplicar e de reaplicar, sem ressecar.",
        benefits: ["Hidratação", "Cor intensa", "Longa duração"],
        howToUse:
            "Aplique diretamente nos lábios e, para um efeito mais suave, esfume com o dedo.",
        ingredients: "Isododecane, Dimethicone, Cherry Extract, Vitamina E.",
        shades: [
            { code: "01", name: "Cherry", hex: "#C41E3A" },
            { code: "02", name: "Coral", hex: "#FF7F50" },
            { code: "03", name: "Berry", hex: "#8B3A62" },
        ],
        gallery: [catLips, heroEditorial, catFace, catSkin],
    },
    "cloud-mascara": {
        shortDescription: "Máscara volumizadora para cílios definidos.",
        description:
            "Dá volume e alonga os cílios sem criar grumos nem borrar ao longo do dia. A fórmula é resistente à água e fácil de remover.",
        benefits: ["Volume e alongamento", "Resistente à água", "Sem borrões"],
        howToUse: "Aplique da raiz às pontas dos cílios, em zigue-zague.",
        ingredients: "Beeswax, Carnauba Wax, Iron Oxides, Panthenol.",
        shades: [{ code: "01", name: "Black", hex: "#1F1F1F" }],
        gallery: [catEyes, catFace, catLips, heroEditorial],
    },
    "nude-mood-palette": {
        shortDescription: "Paleta com 12 sombras em tons nude.",
        description:
            "Doze sombras que combinam acabamentos matte e cintilante, para criar do olhar do dia a dia a uma make mais marcada.",
        benefits: [
            "Alta pigmentação",
            "Fácil de esfumar",
            "12 cores versáteis",
        ],
        howToUse:
            "Aplique com pincéis de sombra, começando pelos tons claros e esfumando os mais escuros nos cantos.",
        ingredients: "Mica, Talc, Magnesium Stearate, Dimethicone.",
        shades: [],
        gallery: [catEyes, catSkin, catFace, heroEditorial],
    },
    "glow-stick": {
        shortDescription: "Iluminador em bastão de aplicação prática.",
        description:
            "Um bastão que entrega pontos de luz com um toque. O brilho é construível e a textura não transfere nem marca a pele.",
        benefits: ["Brilho construível", "Aplicação prática", "Não transfere"],
        howToUse: "Aplique nos pontos altos do rosto e esfume com os dedos.",
        ingredients:
            "Mica, Synthetic Fluorphlogopite, Dimethicone, Vitamina E.",
        shades: [
            { code: "01", name: "Pearl", hex: "#F8F4E8" },
            { code: "02", name: "Gold", hex: "#FFD700" },
            { code: "03", name: "Rose Gold", hex: "#E0BFB8" },
        ],
        gallery: [catFace, catFaceBlush, catSkin, heroEditorial],
    },
    "soft-touch-concealer": {
        shortDescription: "Corretivo de alta cobertura e textura leve.",
        description:
            "Cobre olheiras e imperfeições com uma textura leve, que não craquela e ainda hidrata a pele.",
        benefits: ["Alta cobertura", "Não craquela", "Hidratação"],
        howToUse:
            "Aplique em pequenas quantidades sobre a área desejada e esfume com a ponta dos dedos ou esponja.",
        ingredients: "Water, Cyclopentasiloxane, Titanium Dioxide, Caffeine.",
        shades: [
            { code: "01", name: "Fair", hex: "#F9E4D6" },
            { code: "02", name: "Light", hex: "#F0D0B8" },
            { code: "03", name: "Medium", hex: "#E0B090" },
            { code: "04", name: "Tan", hex: "#C89068" },
        ],
        gallery: [catFace, catSkin, catEyes, heroEditorial],
    },
    "glass-lip-gloss": {
        shortDescription: "Gloss com efeito vidro e hidratação intensa.",
        description:
            "Brilho intenso com efeito vidro e textura confortável, sem sensação pegajosa. Pode ser usado sozinho ou sobre o batom.",
        benefits: ["Brilho intenso", "Hidratação", "Textura confortável"],
        howToUse: "Aplique diretamente nos lábios ou sobre o batom.",
        ingredients: "Polybutene, Octyldodecanol, Hyaluronic Acid, Vitamina E.",
        shades: [
            { code: "01", name: "Clear", hex: "#FFFFFF" },
            { code: "02", name: "Pink", hex: "#FFB6C1" },
            { code: "03", name: "Nude", hex: "#E8C4B0" },
        ],
        gallery: [catLips, heroEditorial, catFace, catSkin],
    },
}

export default productDetails
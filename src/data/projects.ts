const assetModules = import.meta.glob("../assets/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const assetByName = Object.fromEntries(
  Object.entries(assetModules).map(([path, url]) => [path.split("/").pop() ?? path, url]),
);

const blueprint = assetByName["blueprint.jpg"] ?? "";

const resolveGallery = (fileNames: string[]) => {
  const images = fileNames.map((fileName) => assetByName[fileName]).filter((image): image is string => Boolean(image));
  return images.length > 0 ? images : [blueprint];
};

export type FileType = "Revit" | "DWG" | "PDF" | "Bônus";

export type Project = {
  id: string;
  title: string;
  category: string;
  type: "Térrea" | "Duplex" | "Triplex" | "Sobrado" | "Kitnet" | "Condomínio" | "Comercial" | "Prédio" | "Bônus";
  landSize: string;
  builtArea: string;
  image: string;
  images: string[];
  hasMappedCover: boolean;
  description: string;
  files: FileType[];
  tags: string[];
  isBonus?: boolean;
  isFree?: boolean;
  downloadUrl?: string;
};

const landWidth = (value: string) => {
  const [wRaw] = value.split("x");
  const w = parseFloat((wRaw ?? "").replace(",", ".").replace(/[^\d.]/g, ""));
  return Number.isFinite(w) ? w : Number.POSITIVE_INFINITY;
};

const raw: Array<Omit<Project, "image" | "images"> & { img?: number }> = [
  // Featured
  { id: "roma-10x20", title: "Projeto Roma", category: "Casas Modernas", type: "Térrea", landSize: "10x20 m", builtArea: "98 m²", description: "Casa térrea moderna com 3 quartos, suíte e área gourmet integrada.", files: ["Revit", "DWG", "PDF"], tags: ["3 quartos", "Suíte", "Garagem 2"], img: 0 },
  { id: "lisboa-13x25", title: "Projeto Lisboa", category: "Casas Modernas", type: "Térrea", landSize: "13x25 m", builtArea: "142 m²", description: "Térrea sofisticada com pé-direito duplo na sala e fachada minimalista.", files: ["Revit", "DWG", "PDF"], tags: ["Pé-direito duplo", "3 suítes"], img: 2 },
  { id: "madrid-13x30", title: "Projeto Madrid", category: "Casas Modernas", type: "Térrea", landSize: "13x30 m", builtArea: "180 m²", description: "Projeto amplo com piscina, churrasqueira e 4 suítes.", files: ["Revit", "DWG", "PDF"], tags: ["Piscina", "4 suítes"], img: 1 },
  { id: "berlim-12x25", title: "Projeto Berlim", category: "Sobrados e Duplex", type: "Duplex", landSize: "12x25 m", builtArea: "210 m²", description: "Duplex contemporâneo com fachada em concreto aparente.", files: ["Revit", "DWG", "PDF"], tags: ["Duplex", "Concreto"], img: 4, isFree: true, downloadUrl: "https://drive.google.com/drive/folders/1IatZwizZXk5Ko-vJqMdAnJlZHx9DVxPV?usp=drive_link" },
  { id: "p018-copenhague", title: "Projeto Copenhague", category: "Casas Modernas", type: "Térrea", landSize: "12x20 m", builtArea: "—", description: "Casa térrea para lote 12x20 com proposta contemporânea e ambientes bem resolvidos.", files: ["Revit", "DWG", "PDF"], tags: ["Térrea", "12x20"], img: 2 },
  { id: "p010-lima", title: "Projeto Lima", category: "Sobrados e Duplex", type: "Duplex", landSize: "—", builtArea: "—", description: "Projeto duplex com fachada marcante e planta pensada para conforto no dia a dia.", files: ["Revit", "DWG", "PDF"], tags: ["Duplex"], img: 4 },
  { id: "p009-moscou", title: "Projeto Moscou", category: "Casas Modernas", type: "Térrea", landSize: "12x25 m", builtArea: "—", description: "Casa térrea para lote 12x25 com fachada marcante e planta funcional.", files: ["Revit", "DWG", "PDF"], tags: ["Térrea", "12x25"], img: 2 },
  { id: "p011-teera", title: "Projeto Teerã", category: "Sobrados e Duplex", type: "Triplex", landSize: "12x25 m", builtArea: "—", description: "Projeto triplex para lote 12x25 com volumetria moderna e ótima distribuição vertical.", files: ["Revit", "DWG", "PDF"], tags: ["Triplex", "12x25"], img: 4, isFree: true, downloadUrl: "https://drive.google.com/drive/folders/1GK9VZzAHBLkbksGeZarcrVJIDaBYQKxn?usp=drive_link" },
  { id: "p022-12x24", title: "Casa Duplex 12x24", category: "Sobrados e Duplex", type: "Duplex", landSize: "12x24 m", builtArea: "240 m²", description: "Casa duplex ampla para lote 12x24 com ambientes generosos e fachada marcante.", files: ["Revit", "DWG", "PDF"], tags: ["Duplex", "240 m²"], img: 4 },
  { id: "p025-12x22", title: "Casa Térrea 12x22", category: "Casas Modernas", type: "Térrea", landSize: "12x22 m", builtArea: "180 m²", description: "Casa térrea moderna com 180 m² e planta confortável para lote 12x22.", files: ["Revit", "DWG", "PDF"], tags: ["Térrea", "180 m²"], img: 2 },
  { id: "p027-comercial-12x25", title: "Comercial 12x25", category: "Comercial", type: "Comercial", landSize: "12x25 m", builtArea: "—", description: "Projeto comercial para lote 12x25 com layout versátil para operação e atendimento.", files: ["Revit", "DWG", "PDF"], tags: ["Comercial", "12x25"], img: 5 },
  { id: "toquio-10x25", title: "Projeto Tóquio", category: "Casas Modernas", type: "Térrea", landSize: "10x25 m", builtArea: "120 m²", description: "Inspiração japonesa, jardim interno e linhas limpas.", files: ["Revit", "DWG", "PDF"], tags: ["Jardim interno"], img: 2 },
  { id: "londres-12x25", title: "Projeto Londres", category: "Sobrados e Duplex", type: "Duplex", landSize: "12x25 m", builtArea: "195 m²", description: "Sobrado urbano com home office e terraço.", files: ["Revit", "DWG", "PDF"], tags: ["Home office", "Terraço"], img: 1 },
  { id: "bagda-10x25", title: "Projeto Bagdá", category: "Casas Modernas", type: "Térrea", landSize: "10x25 m", builtArea: "140 m²", description: "Térrea ampla com área social integrada e boa iluminação natural.", files: ["Revit", "DWG", "PDF"], tags: ["Térrea", "Integrada"], img: 3, isFree: true, downloadUrl: "https://drive.google.com/drive/folders/1tswlRZCHSrpG36atTNaaHhkFcBNvH--c?usp=drive_link" },
  { id: "atenas-10x21", title: "Projeto Atenas", category: "Casas Modernas", type: "Térrea", landSize: "10x21 m", builtArea: "—", description: "Térrea otimizada para lote 10x21 com layout funcional.", files: ["Revit", "DWG", "PDF"], tags: ["Térrea"], img: 2 },
  { id: "zagreb-10x25", title: "Projeto Zagreb", category: "Casas Modernas", type: "Térrea", landSize: "10x25 m", builtArea: "195 m²", description: "Projeto de alto padrão com foco em conforto e espaços amplos.", files: ["Revit", "DWG", "PDF"], tags: ["Alto padrão"], img: 4 },
  { id: "amsterda-15x30", title: "Projeto Amsterdã", category: "Casas Modernas", type: "Térrea", landSize: "15x30 m", builtArea: "—", description: "Térrea contemporânea com áreas generosas e fachada marcante.", files: ["Revit", "DWG", "PDF"], tags: ["Contemporânea"], img: 1 },
  { id: "bruxelas-15x30", title: "Projeto Bruxelas", category: "Casas Modernas", type: "Térrea", landSize: "15x30 m", builtArea: "—", description: "Térrea com distribuição inteligente e ambientes integrados.", files: ["Revit", "DWG", "PDF"], tags: ["Térrea"], img: 0 },
  { id: "camberra-10x30", title: "Projeto Camberra", category: "Comercial", type: "Comercial", landSize: "10x30 m", builtArea: "—", description: "Projeto comercial para lote 10x30 com planta flexível.", files: ["Revit", "DWG", "PDF"], tags: ["Comercial"], img: 5 },
  { id: "belgrado-27x30", title: "Projeto Belgrado (Agência)", category: "Comercial", type: "Comercial", landSize: "27x30 m", builtArea: "—", description: "Projeto corporativo para agência com áreas de atendimento e operação.", files: ["Revit", "DWG", "PDF"], tags: ["Agência"], img: 3 },

  // Populares 4x...
  { id: "p010", title: "Condomínio Térrea 010", category: "Casas Populares", type: "Condomínio", landSize: "4x15 m", builtArea: "50 m²", description: "Modelo otimizado para condomínio horizontal popular.", files: ["DWG", "PDF"], tags: ["Compacta"], img: 0 },
  { id: "p021", title: "Mini Casa 021", category: "Projetos para Terrenos Pequenos", type: "Térrea", landSize: "4,3x5,30 m", builtArea: "22 m²", description: "Mini casa otimizada para o menor terreno possível.", files: ["DWG", "PDF"], tags: ["Mini"], img: 5 },
  { id: "p024", title: "Casa Duplex 024", category: "Sobrados e Duplex", type: "Duplex", landSize: "4,5x20 m", builtArea: "137 m²", description: "Duplex estreito com excelente aproveitamento vertical.", files: ["Revit", "DWG", "PDF"], tags: ["Lote estreito"], img: 4, isFree: true, downloadUrl: "https://drive.google.com/drive/folders/1dPbC_mVffn4uABFYdhplJPxzHbiJuI3Y?usp=drive_link" },
  { id: "p026", title: "Casa Térrea 026", category: "Projetos para Terrenos Pequenos", type: "Térrea", landSize: "4,7x20 m", builtArea: "72,79 m²", description: "Térrea funcional para terreno estreito.", files: ["DWG", "PDF"], tags: ["Compacta"], img: 0 },
  { id: "p027", title: "Casa Duplex 027", category: "Sobrados e Duplex", type: "Duplex", landSize: "4,5x19,80 m", builtArea: "145,92 m²", description: "Duplex moderno em lote estreito.", files: ["Revit", "DWG", "PDF"], tags: ["Duplex"], img: 1 },
  { id: "p039", title: "Cond. Duplex 039", category: "Casas Populares", type: "Condomínio", landSize: "4x12 m", builtArea: "70 m²", description: "Solução de condomínio com unidades duplex compactas.", files: ["DWG", "PDF"], tags: ["Condomínio"], img: 3 },
  { id: "p044", title: "Cond. Casas Duplex 044", category: "Casas Populares", type: "Condomínio", landSize: "5x12 m", builtArea: "80 m²", description: "Condomínio com casas duplex compactas e fachada simples.", files: ["DWG", "PDF"], tags: ["Condomínio", "Duplex"], img: 4 },

  // 5x
  { id: "p011", title: "Cond. Térrea 011", category: "Casas Populares", type: "Condomínio", landSize: "5x20 m", builtArea: "50 m²", description: "Térrea popular para empreendimentos.", files: ["DWG", "PDF"], tags: ["Popular"], img: 0 },
  { id: "p012", title: "Casa Duplex 012", category: "Sobrados e Duplex", type: "Duplex", landSize: "5x26 m", builtArea: "75,27 m²", description: "Duplex compacto e moderno.", files: ["DWG", "PDF"], tags: ["Duplex"], img: 4 },
  { id: "p013", title: "Casa Duplex 013", category: "Sobrados e Duplex", type: "Duplex", landSize: "5x26 m", builtArea: "76,98 m²", description: "Variação do modelo 012 com layout otimizado.", files: ["DWG", "PDF"], tags: ["Duplex"], img: 1 },
  { id: "p014", title: "Casa Térrea 014", category: "Casas Modernas", type: "Térrea", landSize: "5,5x29 m", builtArea: "90 m²", description: "Casa térrea funcional com boa implantação para lote 5,5x29.", files: ["DWG", "PDF"], tags: ["Térrea", "90 m²"], img: 2, isFree: true, downloadUrl: "https://drive.google.com/drive/folders/1Ttb8YWrOpHmKAF0XBpn8VAqJmDSvBucI?usp=drive_link" },
  { id: "p047", title: "Sobrado 047", category: "Sobrados e Duplex", type: "Sobrado", landSize: "5,5x22 m", builtArea: "93 m²", description: "Sobrado prático com fachada limpa.", files: ["Revit", "DWG", "PDF"], tags: ["Sobrado"], img: 2 },
  { id: "p025", title: "Casa Duplex 025", category: "Sobrados e Duplex", type: "Duplex", landSize: "5,66x23,5 m", builtArea: "83,01 m²", description: "Casa duplex compacta com boa distribuição interna para lote estreito.", files: ["DWG", "PDF"], tags: ["Duplex", "83,01 m²"], img: 4 },
  { id: "p048", title: "Casa + Etapas 048", category: "Casas Populares", type: "Térrea", landSize: "5x35 m", builtArea: "45 m²", description: "Inclui etapas detalhadas da obra.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 0 },
  { id: "p049", title: "Casa + Etapas 049", category: "Casas Populares", type: "Térrea", landSize: "5,5x26,80 m", builtArea: "43 m²", description: "Projeto popular com etapas da obra para execução mais simples.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 0 },
  { id: "p050", title: "Casa + Etapas 050", category: "Casas Populares", type: "Térrea", landSize: "5,5x30 m", builtArea: "70,50 m²", description: "Projeto com etapas e quantitativos para obra organizada.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 5 },
  { id: "p051", title: "Casa + Etapas 051", category: "Casas Populares", type: "Térrea", landSize: "5x25 m", builtArea: "40 m²", description: "Casa compacta com etapas de obra e layout funcional.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 0 },
  { id: "p052", title: "Casa + Etapas 052", category: "Casas Populares", type: "Térrea", landSize: "5x25 m", builtArea: "43 m²", description: "Variação do modelo 051 com ajustes de layout.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 0 },
  { id: "p053", title: "Casa + Etapas 053", category: "Casas Populares", type: "Térrea", landSize: "5x25 m", builtArea: "48,27 m²", description: "Projeto popular com melhor aproveitamento dos ambientes.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 0 },
  { id: "p054", title: "Casa + Etapas 054", category: "Casas Populares", type: "Térrea", landSize: "5x28,25 m", builtArea: "50 m²", description: "Casa popular otimizada com etapas detalhadas para construção.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 0 },

  // 6x
  { id: "p006", title: "Casa Duplex 006", category: "Sobrados e Duplex", type: "Duplex", landSize: "6x26 m", builtArea: "115 m²", description: "Duplex confortável com 3 dormitórios.", files: ["Revit", "DWG", "PDF"], tags: ["3 dorm"], img: 1 },
  { id: "p022", title: "Casa Térrea 022", category: "Casas Modernas", type: "Térrea", landSize: "6x25 m", builtArea: "93,47 m²", description: "Térrea com integração total entre áreas sociais.", files: ["DWG", "PDF"], tags: ["Integrada"], img: 2 },
  { id: "p023", title: "Casa Duplex 023", category: "Sobrados e Duplex", type: "Duplex", landSize: "6x18,50 m", builtArea: "170 m²", description: "Duplex amplo com suíte master.", files: ["Revit", "DWG", "PDF"], tags: ["Suíte master"], img: 4 },
  { id: "p043", title: "Cond. Térrea 043", category: "Casas Populares", type: "Condomínio", landSize: "6x20 m", builtArea: "80 m²", description: "Condomínio com casas térreas para implantação eficiente.", files: ["DWG", "PDF"], tags: ["Condomínio"], img: 3 },
  { id: "p043-duplex-5x20", title: "Casa Duplex 043", category: "Sobrados e Duplex", type: "Duplex", landSize: "5x20 m", builtArea: "80 m²", description: "Casa duplex compacta para lote 5x20 com conjunto completo de fachadas e variações.", files: ["DWG", "PDF"], tags: ["Duplex", "80 m²"], img: 4 },

  // 7x
  { id: "p005", title: "Casa Duplex 005", category: "Sobrados e Duplex", type: "Duplex", landSize: "7,50x20 m", builtArea: "110 m²", description: "Casa duplex para lote 7,50x20 com layout funcional e boa área construída.", files: ["Revit", "DWG", "PDF"], tags: ["Duplex", "7,50x20", "110 m²"], img: 4 },
  { id: "p002", title: "Casa Térrea 002", category: "Casas Modernas", type: "Térrea", landSize: "7,5x30 m", builtArea: "80 m²", description: "Térrea com planta simples e ambientes integrados.", files: ["DWG", "PDF"], tags: ["Integrada"], img: 2, isFree: true, downloadUrl: "https://drive.google.com/drive/folders/1UHf53f333RJiCt7FXPE4BqeZqxw39yQI?usp=drive_link" },
  { id: "p003", title: "Casa Térrea 003", category: "Casas Modernas", type: "Térrea", landSize: "7,5x30 m", builtArea: "82 m²", description: "Variação do modelo 002 com ajustes de layout.", files: ["DWG", "PDF"], tags: ["Térrea"], img: 1 },
  { id: "p015", title: "Casa Térrea 015", category: "Casas Modernas", type: "Térrea", landSize: "7x25 m", builtArea: "101 m²", description: "Térrea moderna com fachada em ripado.", files: ["Revit", "DWG", "PDF"], tags: ["Ripado"], img: 2 },
  { id: "p030", title: "Cond. Térrea 030", category: "Casas Populares", type: "Condomínio", landSize: "7x20 m", builtArea: "50 m²", description: "Condomínio com unidades térreas compactas e econômicas.", files: ["DWG", "PDF"], tags: ["Condomínio"], img: 0 },
  { id: "p036", title: "Cond. Térrea 036", category: "Casas Populares", type: "Condomínio", landSize: "7x20 m", builtArea: "60 m²", description: "Projeto para condomínio com casas térreas bem distribuídas.", files: ["DWG", "PDF"], tags: ["Condomínio"], img: 0 },
  { id: "p037", title: "Cond. Térrea 037", category: "Casas Populares", type: "Condomínio", landSize: "5x20 m", builtArea: "60 m²", description: "Projeto de condomínio com casas térreas em lote 5x20.", files: ["DWG", "PDF"], tags: ["Condomínio"], img: 0 },
  { id: "p055", title: "Casa Térrea 055", category: "Projetos para Terrenos Pequenos", type: "Térrea", landSize: "7x22 m", builtArea: "45,30 m²", description: "Térrea compacta com 2 dormitórios.", files: ["DWG", "PDF"], tags: ["2 dorm"], img: 0 },
  { id: "p056", title: "Casa Térrea 056", category: "Projetos para Terrenos Pequenos", type: "Térrea", landSize: "7x22 m", builtArea: "40 m²", description: "Casa térrea compacta com layout econômico.", files: ["DWG", "PDF"], tags: ["Compacta"], img: 0 },
  { id: "p057", title: "Casa + Etapas 057", category: "Casas Populares", type: "Térrea", landSize: "7x22 m", builtArea: "40 m²", description: "Projeto com etapas da obra para execução facilitada.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 0 },
  { id: "p058", title: "Casa + Etapas 058", category: "Casas Populares", type: "Térrea", landSize: "7x22 m", builtArea: "41,40 m²", description: "Variação do modelo 057 com ajustes no layout.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 0 },
  { id: "p059", title: "Casa + Etapas 059", category: "Casas Populares", type: "Térrea", landSize: "7x22 m", builtArea: "42 m²", description: "Projeto popular com etapas e planta otimizada.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 0 },
  { id: "p060", title: "Casa + Etapas 060", category: "Casas Populares", type: "Térrea", landSize: "7x22 m", builtArea: "45 m²", description: "Casa popular com etapas e bom aproveitamento interno.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 0 },
  { id: "p063", title: "Casa + Etapas 063", category: "Casas Populares", type: "Térrea", landSize: "7x25 m", builtArea: "87 m²", description: "Projeto com etapas e ambientes maiores para lote 7x25.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 5 },
  { id: "p064", title: "Casa + Etapas 064", category: "Casas Populares", type: "Térrea", landSize: "7x22 m", builtArea: "73,80 m²", description: "Casa com etapas e área construída ampliada.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 5 },

  // 8x
  { id: "p008", title: "Duplex + Comercial 008", category: "Sobrados e Duplex", type: "Duplex", landSize: "8x23 m", builtArea: "180 m²", description: "Duplex com ponto comercial no térreo.", files: ["Revit", "DWG", "PDF"], tags: ["Comercial"], img: 4, isFree: true, downloadUrl: "https://drive.google.com/drive/folders/18KCJJBSu-CsJydjD38joYvUYHAQIx6XZ?usp=drive_link" },
  { id: "p009", title: "Cond. Térrea 009", category: "Casas Populares", type: "Condomínio", landSize: "8x11 m", builtArea: "70 m²", description: "Condomínio com casa térrea compacta para lote 8x11.", files: ["DWG", "PDF"], tags: ["Condomínio"], img: 3, isFree: true, downloadUrl: "https://drive.google.com/drive/folders/1-gl5APo8f9VBrK2YQXiAHTOYpLp1qWvv?usp=drive_link" },
  { id: "p020", title: "Casa Térrea 020", category: "Casas Modernas", type: "Térrea", landSize: "8x30 m", builtArea: "142,46 m²", description: "Térrea ampla com varanda integrada.", files: ["Revit", "DWG", "PDF"], tags: ["Varanda"], img: 2 },
  { id: "p031", title: "Casa Térrea 031", category: "Casas Populares", type: "Térrea", landSize: "8x20 m", builtArea: "60 m²", description: "Térrea compacta com excelente custo-benefício.", files: ["DWG", "PDF"], tags: ["Popular"], img: 0 },
  { id: "p033", title: "Casa Térrea 033", category: "Casas Modernas", type: "Térrea", landSize: "8x20 m", builtArea: "90 m²", description: "Térrea com planta bem resolvida e fachada contemporânea.", files: ["Revit", "DWG", "PDF"], tags: ["Térrea"], img: 2 },
  { id: "p035", title: "Casa Térrea 035", category: "Casas Populares", type: "Térrea", landSize: "—", builtArea: "70 m²", description: "Casa térrea de ponta de quadra com solução compacta e prática.", files: ["DWG", "PDF"], tags: ["Ponta de quadra", "70 m²"], img: 0 },
  { id: "p038", title: "Cond. Térrea 038", category: "Casas Populares", type: "Condomínio", landSize: "8x15 m", builtArea: "80 m²", description: "Condomínio com casas térreas para implantação eficiente.", files: ["DWG", "PDF"], tags: ["Condomínio"], img: 3 },

  // 9x
  { id: "p007", title: "Casa com Subsolo 007", category: "Casas Modernas", type: "Térrea", landSize: "9x25 m", builtArea: "160 m²", description: "Projeto com subsolo para garagem ampla.", files: ["Revit", "DWG", "PDF"], tags: ["Subsolo"], img: 1, isFree: true, downloadUrl: "https://drive.google.com/drive/folders/1do13qnLw7Bh272i82SJ9gC8y1HQ8Fyxp?usp=drive_link" },

  // 10x featured extras
  { id: "p001", title: "Casa Térrea 001", category: "Casas Populares", type: "Térrea", landSize: "10x20 m", builtArea: "74 m²", description: "Térrea popular com excelente custo-benefício.", files: ["DWG", "PDF"], tags: ["Popular"], img: 0, isFree: true, downloadUrl: "https://drive.google.com/drive/folders/14HD5lr-jTDNBD8uR-IUWhAii5mMKowq-?usp=drive_link" },
  { id: "p004", title: "Casa Térrea 004", category: "Casas Populares", type: "Térrea", landSize: "10x20 m", builtArea: "70 m²", description: "Projeto térreo popular com ambientes bem dimensionados.", files: ["DWG", "PDF"], tags: ["Popular"], img: 0 },
  { id: "p016", title: "Casa Térrea 016", category: "Casas Populares", type: "Térrea", landSize: "10x24,5 m", builtArea: "66,03 m²", description: "Térrea funcional com boa circulação interna.", files: ["DWG", "PDF"], tags: ["Térrea"], img: 0 },
  { id: "p017", title: "Casa Térrea 017", category: "Casas Populares", type: "Térrea", landSize: "10x25 m", builtArea: "57,38 m²", description: "Térrea compacta com foco em economia de obra.", files: ["DWG", "PDF"], tags: ["Compacta"], img: 0 },
  { id: "p018", title: "Casa Térrea 018", category: "Casas Populares", type: "Térrea", landSize: "10x25 m", builtArea: "68,88 m²", description: "Casa popular com planta simples e prática.", files: ["DWG", "PDF"], tags: ["Popular"], img: 0 },
  { id: "p019", title: "Casa Térrea 019", category: "Casas Populares", type: "Térrea", landSize: "10x25 m", builtArea: "69,73 m²", description: "Projeto popular com ambientes integrados.", files: ["DWG", "PDF"], tags: ["Integrada"], img: 0 },
  { id: "p028-10x20", title: "Casa Térrea 028", category: "Casas Modernas", type: "Térrea", landSize: "10x20 m", builtArea: "97,61 m²", description: "Térrea moderna para lote 10x20 com boa setorização.", files: ["Revit", "DWG", "PDF"], tags: ["Térrea"], img: 2 },
  { id: "p029-10x20", title: "Casa Térrea 029", category: "Casas Modernas", type: "Térrea", landSize: "10x20 m", builtArea: "88 m²", description: "Térrea com fachada contemporânea e planta otimizada.", files: ["Revit", "DWG", "PDF"], tags: ["Térrea"], img: 2 },
  { id: "p032", title: "Casa Térrea 032", category: "Casas Modernas", type: "Térrea", landSize: "10x20 m", builtArea: "77,79 m²", description: "Térrea compacta com excelente aproveitamento.", files: ["DWG", "PDF"], tags: ["Compacta"], img: 2 },
  { id: "p034", title: "Casa Térrea 034", category: "Casas Populares", type: "Térrea", landSize: "10x20 m", builtArea: "60 m²", description: "Térrea popular com planta enxuta e funcional.", files: ["DWG", "PDF"], tags: ["Popular"], img: 0 },
  { id: "p042", title: "Casa Térrea 042", category: "Casas Populares", type: "Térrea", landSize: "10x20 m", builtArea: "70 m²", description: "Casa térrea popular com layout bem distribuído.", files: ["DWG", "PDF"], tags: ["Popular"], img: 0 },
  { id: "p046", title: "Casa Térrea 046", category: "Casas Modernas", type: "Térrea", landSize: "10x20 m", builtArea: "90 m²", description: "Térrea com fachada moderna e 3 quartos.", files: ["Revit", "DWG", "PDF"], tags: ["3 quartos"], img: 2 },
  { id: "p045", title: "Casa Duplex 045", category: "Sobrados e Duplex", type: "Duplex", landSize: "10x30 m", builtArea: "100 m²", description: "Duplex equilibrado entre área e funcionalidade.", files: ["Revit", "DWG", "PDF"], tags: ["Duplex"], img: 4 },
  { id: "p062", title: "Casa + Etapas 062", category: "Casas Populares", type: "Térrea", landSize: "11x22 m", builtArea: "52 m²", description: "Casa popular com etapas da obra para execução organizada.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 0 },
  { id: "p061", title: "Casa + Etapas 061", category: "Casas Populares", type: "Térrea", landSize: "—", builtArea: "—", description: "Projeto com etapas da obra e conjunto visual complementar para execução.", files: ["DWG", "PDF"], tags: ["Etapas obra"], img: 0 },

  // 13x+
  { id: "p024-triplex", title: "Casa Triplex 13x26", category: "Sobrados e Duplex", type: "Triplex", landSize: "13x26 m", builtArea: "300 m²", description: "Triplex de alto padrão com elevador opcional.", files: ["Revit", "DWG", "PDF"], tags: ["Triplex", "Alto padrão"], img: 1, isFree: true, downloadUrl: "https://drive.google.com/drive/folders/1-ePGTI5EzKz74lWr81anxmcm891bJbDH?usp=drive_link" },
  { id: "p028", title: "Casa Térrea 13x20", category: "Casas Modernas", type: "Térrea", landSize: "13x20 m", builtArea: "130 m²", description: "Térrea generosa com 4 quartos.", files: ["Revit", "DWG", "PDF"], tags: ["4 quartos"], img: 2 },
  { id: "sobrado-295", title: "Projeto Sobrado 295,11m²", category: "Sobrados e Duplex", type: "Sobrado", landSize: "—", builtArea: "295,11 m²", description: "Sobrado amplo com 295,11 m² de área construída e ótima distribuição de ambientes.", files: ["Revit", "DWG", "PDF"], tags: ["Sobrado", "Amplo"], img: 4, isFree: true, downloadUrl: "https://drive.google.com/drive/folders/1R4Q8peQ4zVD4ftAi76ju6FaW2DGUaQCr?usp=drive_link" },
  { id: "sobrado-225", title: "Projeto Sobrado 225,47m²", category: "Sobrados e Duplex", type: "Sobrado", landSize: "—", builtArea: "225,47 m²", description: "Sobrado com 225,47 m², pensado para conforto e funcionalidade no dia a dia.", files: ["Revit", "DWG", "PDF"], tags: ["Sobrado", "225 m²"], img: 1, isFree: true, downloadUrl: "https://drive.google.com/drive/folders/1c9LMtPLJgwJ4h5WUwbHw9CbYs12U47op?usp=drive_link" },

  // 15x+
  { id: "p013-jacarta", title: "Projeto Jacarta", category: "Casas Modernas", type: "Térrea", landSize: "15x40 m", builtArea: "260 m²", description: "Projeto premium com piscina e área gourmet ampla.", files: ["Revit", "DWG", "PDF"], tags: ["Premium"], img: 2 },
  { id: "p023-15x20", title: "Casa Duplex 15x20", category: "Sobrados e Duplex", type: "Duplex", landSize: "15x20 m", builtArea: "190 m²", description: "Duplex com áreas sociais amplas e suíte master confortável.", files: ["Revit", "DWG", "PDF"], tags: ["Duplex"], img: 4 },
  { id: "p017-oslo", title: "Projeto Oslo", category: "Casas Modernas", type: "Térrea", landSize: "15x30 m", builtArea: "200 m²", description: "Inspiração escandinava com madeira e branco.", files: ["Revit", "DWG", "PDF"], tags: ["Escandinavo"], img: 1 },
  { id: "p029-manila", title: "Projeto Manila", category: "Sobrados e Duplex", type: "Duplex", landSize: "15x20 m", builtArea: "220 m²", description: "Duplex contemporâneo de 4 suítes.", files: ["Revit", "DWG", "PDF"], tags: ["4 suítes"], img: 4 },
  { id: "p030-15x20", title: "Casa Térrea 15x20", category: "Casas Modernas", type: "Térrea", landSize: "15x20 m", builtArea: "210 m²", description: "Térrea ampla para lote 15x20 com foco em conforto.", files: ["Revit", "DWG", "PDF"], tags: ["Ampla"], img: 2 },

  // 18x+
  { id: "p031-singapura", title: "Projeto Singapura", category: "Sobrados e Duplex", type: "Duplex", landSize: "18x30 m", builtArea: "300 m²", description: "Duplex luxo com cinema e adega.", files: ["Revit", "DWG", "PDF"], tags: ["Luxo", "Cinema"], img: 1 },
  { id: "p019-sofia", title: "Projeto Sófia", category: "Sobrados e Duplex", type: "Duplex", landSize: "19x30 m", builtArea: "320 m²", description: "Duplex sofisticado com pé-direito triplo.", files: ["Revit", "DWG", "PDF"], tags: ["Sofisticado"], img: 4 },
  { id: "p021-varsovia", title: "Projeto Varsóvia (Hospital)", category: "Comercial", type: "Comercial", landSize: "20x30 m", builtArea: "440 m²", description: "Projeto hospitalar completo.", files: ["Revit", "DWG", "PDF"], tags: ["Hospital"], img: 5 },
  { id: "p007-novadeli", title: "Projeto Nova Deli (Prédio)", category: "Comercial", type: "Prédio", landSize: "15x30 m", builtArea: "—", description: "Edifício residencial multifamiliar.", files: ["Revit", "DWG", "PDF"], tags: ["Edifício"], img: 3 },

  // Bônus
  { id: "b-planilha-pro", title: "Planilha PRO de Custos", category: "Bônus Exclusivos", type: "Bônus", landSize: "—", builtArea: "—", description: "Planilha completa para orçar sua obra do início ao fim.", files: ["Bônus"], tags: ["Planilha"], img: 5, isBonus: true },
  { id: "b-checklist-prefeitura", title: "Checklist Aprovação Prefeitura", category: "Bônus Exclusivos", type: "Bônus", landSize: "—", builtArea: "—", description: "Lista completa de documentos para aprovação na prefeitura.", files: ["Bônus"], tags: ["Checklist"], img: 5, isBonus: true },
  { id: "b-guia-pratico", title: "Guia Prático de Construção", category: "Bônus Exclusivos", type: "Bônus", landSize: "—", builtArea: "—", description: "Manual passo a passo para acompanhar a obra.", files: ["Bônus"], tags: ["Guia"], img: 5, isBonus: true },
  { id: "b-cronograma", title: "Cronograma Realista de Obra", category: "Bônus Exclusivos", type: "Bônus", landSize: "—", builtArea: "—", description: "Cronograma editável adaptado à realidade brasileira.", files: ["Bônus"], tags: ["Cronograma"], img: 5, isBonus: true },
  { id: "b-materiais", title: "Lista de Materiais", category: "Bônus Exclusivos", type: "Bônus", landSize: "—", builtArea: "—", description: "Quantitativos de materiais para cada etapa da obra.", files: ["Bônus"], tags: ["Quantitativo"], img: 5, isBonus: true },
  { id: "b-15-erros", title: "Guia dos 15 Erros Caros em Obras", category: "Bônus Exclusivos", type: "Bônus", landSize: "—", builtArea: "—", description: "Aprenda a evitar os erros mais caros em obras.", files: ["Bônus"], tags: ["E-book"], img: 5, isBonus: true },
  { id: "b-kitnets", title: "Kitnets Exclusivas", category: "Bônus Exclusivos", type: "Kitnet", landSize: "Variados", builtArea: "20 a 35 m²", description: "Pack de projetos de kitnets prontas para construção e renda.", files: ["Revit", "DWG", "PDF", "Bônus"], tags: ["Renda"], img: 0, isBonus: true },
  { id: "b-pack-extras", title: "Pack de Projetos Extras", category: "Bônus Exclusivos", type: "Bônus", landSize: "Variados", builtArea: "Variados", description: "Coletânea extra de projetos arquitetônicos surpresa.", files: ["Revit", "DWG", "PDF", "Bônus"], tags: ["Pack"], img: 3, isBonus: true },
];

const galleryFilesById: Record<string, string[]> = {
  "roma-10x20": ["PROJETO ROMA.webp"],
  "madrid-13x30": ["CASA-MADRID.webp"],
  "berlim-12x25": ["PROJETO BERLIM.webp"],
  "p018-copenhague": ["PROJETO COPENHAGUE.webp"],
  "p010-lima": ["PROJETO LIMA.webp"],
  "p009-moscou": ["PROJETO MOSCOU.webp"],
  "p011-teera": ["PROJETO TEERÃ.webp"],
  "toquio-10x25": ["PROJETO TÓQUIO.webp"],
  "londres-12x25": ["PROJETO LONDRES.webp"],
  "bagda-10x25": ["PROJETO BAGDÁ.webp"],
  "atenas-10x21": ["PROJETO ATENAS.webp"],
  "zagreb-10x25": ["PROJETO ZAGREB.webp"],
  "amsterda-15x30": ["PROJETO AMSTERDÃ.webp"],
  "bruxelas-15x30": ["PROJETO BRUXELAS.webp"],
  "belgrado-27x30": ["PROJETO BELGRADO.webp"],
  "p021": ["021 - MINI CASA - 4,3 X 5,30-FACHADA.webp"],
  "p024": ["024 - CASA DUPLEX 4,5 X 20 - 137 M2-02.webp"],
  "p039": [
    "039 - CONDOMINIO COM CASA DUPLEX - 4X12 - 70 M2.webp",
    "039 - CONDOMINIO COM CASA DUPLEX - 4X12 - 70 M2-1.webp",
    "039 - CONDOMINIO COM CASA DUPLEX - 4X12 - 70 M2-2.webp",
    "039 - CONDOMINIO COM CASA DUPLEX - 4X12 - 70 M2-3.webp",
    "039 - CONDOMINIO COM CASA DUPLEX - 4X12 - 70 M2-4.webp",
    "039 - CONDOMINIO COM CASA DUPLEX - 4X12 - 70 M2-5.webp",
    "039 - CONDOMINIO COM CASA DUPLEX - 4X12 - 70 M2-1-6.webp",
  ],
  "p011": [
    "COND. CASAS TERREAS 011 P1.webp",
    "COND. CASAS TERREAS 011 P2.webp",
    "COND. CASAS TERREAS 011 P3.webp",
    "COND. CASAS TERREAS 011 P4.webp",
    "COND. CASAS TERREAS 011 P5.webp",
  ],
  "p012": ["012 - CASA DUPLEX 5X26 -  75,27m2.webp"],
  "p013": ["013-CASA-DUPLEX-5X26-76_98m2-02.webp"],
  "p014": ["014 - CASA TERREA 5,5X29 - 90 M2.webp"],
  "p025": ["025 - CASA DUPLEX 5,66 X23,5 - 83.01 M2.webp"],
  "p006": ["CASA DUPLEX 006.webp"],
  "p022": ["022 - CASA TERREA - 6x25 - 93.47 m2-02.webp"],
  "p023": ["023 - CASA DUPLEX - 6 X 18,50 - 170 M2-02.webp"],
  "p043": ["043 - CONDOMINIO COM CASAS TÉRREAS - 6X20 - 80 M2.webp"],
  "p005": ["CASA DUPLEX 005.webp"],
  "p002": ["CASA TERREA 002.webp", "CASA TERREA 002 - 002.webp", "CASA TERREA 002 - 003.webp"],
  "p003": ["CASA TERREA 003.webp"],
  "p030": [
    "030 - MC CONDOMINIO COM CASAS TÉRREAS - 7X20 - 50 M2-FACHADA-01.webp",
    "030 - MC CONDOMINIO COM CASAS TÉRREAS - 7X20 - 50 M2-FACHADA-02.webp",
    "030 - MC CONDOMINIO COM CASAS TÉRREAS - 7X20 - 50 M2-FACHADA-03.webp",
    "030 - MC CONDOMINIO COM CASAS TÉRREAS - 7X20 - 50 M2-FACHADA-04.webp",
    "030 - MC CONDOMINIO COM CASAS TÉRREAS - 7X20 - 50 M2-FACHADA-05.webp",
  ],
  "p036": [
    "036 - CONDOMINIO COM CASAS TÉRREAS - 7X20 - 60 M2-02.webp",
    "036 - CONDOMINIO COM CASAS TÉRREAS - 7X20 - 60 M2-03.webp",
    "036 - CONDOMINIO COM CASAS TÉRREAS - 7X20 - 60 M2-04.webp",
  ],
  "p059": ["059 - CASA + ETAPAS.webp"],
  "p060": ["060 - CASA + ETAPAS.webp"],
  "p061": ["061 - CASA + ETAPAS P1.webp", "061 - CASA + ETAPAS P2.webp"],
  "p008": ["CASA DUPLEX + COMERCIAL 008.webp", "CASA DUPLEX COMERCIAL 008 - 001.webp", "CASA DUPLEX COMERCIAL 008 - 002.webp", "CASA DUPLEX COMERCIAL 008 - 003.webp", "CASA DUPLEX COMERCIAL 008 - 005.webp", "CASA DUPLEX COMERCIAL 008 - 006.webp"],
  "p009": [
    "COND. CASAS TERREAS 009 P1.webp",
    "COND. CASAS TERREAS 009 P2.webp",
    "COND. CASAS TERREAS 009 P3.webp",
    "COND. CASAS TERREAS 009 P4.webp",
    "COND. CASAS TERREAS 009 P5.webp",
  ],
  "p020": ["020 - CASA TERREA 8X30 - 142.46 M2.webp"],
  "p031": ["031 - MC CASA TÉRREA - 8X20 - 60 M2-02.webp"],
  "p033": ["033 - CASA TERREA - 8X20 - 90 M2.webp"],
  "p035": ["035 - CASA TÉRREA - PONTA DE QUADRA - 70 M2.webp"],
  "p007": ["CASA COM SUBSOLO 007.webp"],
  "p001": ["CASA TERREA 001 - fachada.jpg", "CASA TERREA 001.jpg", "CASA TERREA 001 - 002.jpg", "CASA TERREA 001 - 003.jpg"],
  "p004": ["CASA TERREA 004.webp"],
  "p016": ["016 - CASA TERREA 10X24,5 - 66,03M2.webp"],
  "p018": ["018 - CASA TERREA 10X25 -  68,88m2.webp"],
  "p019": ["019 - CASA TERREA 10X25 -  69,73m2.webp"],
  "p028-10x20": [
    "028 - CASA TERREA - TERRENO 10X20 - 97,61 M2-FACHADA2.webp",
    "028 - CASA TERREA - TERRENO 10X20 - 97,61 M2-FACHADA4.webp",
  ],
  "p029-10x20": [
    "029 - CASA TERREA - TERRENO 10X20 - 88 m2-FACHADA-03.webp",
    "029 - CASA TERREA - TERRENO 10X20 - 88 m2-FACHADA-04.webp",
  ],
  "p024-triplex": ["CASA TRIPLEX - 13X26 - 001.jpg", "CASA TRIPLEX - 13X26 - 002.jpg", "CASA TRIPLEX - 13X26 - 003.jpg", "24-CASA-TRIPLEX-13X26-300M2.webp"],
  "p022-12x24": ["22-CASA-DUPLEX-12X24-240-M2.webp"],
  "p025-12x22": ["25-CASA-TERREA-12X22-180-M2.webp"],
  "p027-comercial-12x25": ["27-COMERCIAL-12X25.webp"],
  "lisboa-13x25": ["CASA-TERREA-13X25-180M2.webp"],
  "p028": ["28-CASA-TERREA-13X20-130-M2.webp"],
  "p013-jacarta": ["PROJETO JACARTA.webp"],
  "p023-15x20": ["23-CASA-DUPLEX-15X20-190-M2.webp"],
  "p017-oslo": ["PROJETO OSLO.webp"],
  "p029-manila": ["PROJETO MANILA.webp"],
  "p030-15x20": ["30-CASA-TERREA-15X20-210M2.webp"],
  "p031-singapura": ["PROJETO SINGAPURA.webp"],
  "p019-sofia": ["PROJETO SÓFIA.webp"],
  "p007-novadeli": ["NOVA DELI.webp"],
  "p043-duplex-5x20": [
    "043 - CASA DUPLEX - 5X20 - 80 M2-02-01.webp",
    "043 - CASA DUPLEX - 5X20 - 80 M2-02-01 (1).webp",
    "043 - CASA DUPLEX - 5X20 - 80 M2-02-01 (2).webp",
    "043 - CASA DUPLEX - 5X20 - 80 M2-02-01 (3).webp",
    "043 - CASA DUPLEX - 5X20 - 80 M2-02-01 (4).webp",
    "043 - CASA DUPLEX - 5X20 - 80 M2-02-01 (5).webp",
    "043 - CASA DUPLEX - 5X20 - 80 M2-02-01 (6).webp",
    "043 - CASA DUPLEX - 5X20 - 80 M2-02-01 (7).webp",
    "043 - CASA DUPLEX - 5X20 - 80 M2-02-01 (8).webp",
    "043 - CASA DUPLEX - 5X20 - 80 M2-02-01 (9).webp",
  ],
  "sobrado-295": [
    "Projeto Sobrado -  295,11m² - fachada.webp",
    "Projeto Sobrado -  295,11m² - PROJETO 14 PLANTA BAIXA SUPERIORP.webp",
    "Projeto Sobrado -  295,11m² - PROJETO 14 PLANTA BAIXA TERREO.webp",
    "Projeto Sobrado -  295,11m² - PROJETO 14 SUPERIOR HUMANIZADO.webp",
    "Projeto Sobrado -  295,11m² - PROJETO 14 TÉRREO HUMANIZADO.webp",
    "Projeto Sobrado -  295,11m² - PROJETO 14_12 - Foto.webp",
    "Projeto Sobrado -  295,11m² - PROJETO 14_14 - Foto.webp",
    "Projeto Sobrado -  295,11m² - PROJETO 14_15 - Foto.webp",
    "Projeto Sobrado -  295,11m² - PROJETO 14_16 - Foto.webp",
    "Projeto Sobrado -  295,11m² - PROJETO 14_17 - Foto.webp",
    "Projeto Sobrado -  295,11m² - PROJETO 14_18 - Foto.webp",
    "Projeto Sobrado -  295,11m² - PROJETO _14_Photo - 1.webp",
    "Projeto Sobrado -  295,11m² - PROJETO _14_Photo - 3.webp",
    "Projeto Sobrado -  295,11m² - PROJETO _14_Photo - 8.webp",
    "Projeto Sobrado -  295,11m² - PROJETO _14_Photo - 10.webp",
  ],
  "sobrado-225": [
    "Projeto-Sobrado-225_47m²-001-fachada.webp",
    "Projeto-Sobrado-225_47m²-humanizada-térreo.webp",
    "Projeto-Sobrado-225_47m²-planta-baixa-primeiro-pav.webp",
    "Projeto-Sobrado-225_47m²-planta-baixa-térreo.webp",
    "Projeto-Sobrado-225_47m²-PROJETO-8_2-Photo.webp",
    "Projeto-Sobrado-225_47m²-PROJETO-8_3-Photo.webp",
    "Projeto-Sobrado-225_47m²-PROJETO-8_4-Photo.webp",
    "Projeto-Sobrado-225_47m²-PROJETO-8_5-Photo.webp",
    "Projeto-Sobrado-225_47m²-PROJETO-8_6-Photo.webp",
    "Projeto-Sobrado-225_47m²-PROJETO-8_7-Photo.webp",
  ],
};

export const projects: Project[] = raw.map((p) => {
  const hasMappedCover = p.id in galleryFilesById;
  const images = resolveGallery(galleryFilesById[p.id] ?? ["blueprint.jpg"]);
  return {
    ...p,
    images,
    image: images[0] ?? blueprint,
    hasMappedCover,
  };
});

export const findProject = (id: string) => projects.find((p) => p.id === id);

export const sections: Array<{ title: string; filter: (p: Project) => boolean }> = [
  { title: "Projetos Grátis", filter: (p) => !!p.isFree },
  { title: "Projetos Mais Acessados", filter: (p) => ["roma-10x20", "lisboa-13x25", "madrid-13x30", "berlim-12x25", "toquio-10x25", "londres-12x25", "p013-jacarta", "p024-triplex"].includes(p.id) },
  { title: "Casas Populares", filter: (p) => p.category === "Casas Populares" || p.builtArea !== "—" && parseFloat(p.builtArea) > 0 && parseFloat(p.builtArea) < 80 },
  { title: "Casas Modernas", filter: (p) => p.category === "Casas Modernas" },
  { title: "Sobrados e Duplex", filter: (p) => p.category === "Sobrados e Duplex" },
  { title: "Projetos para Terrenos Pequenos", filter: (p) => p.category === "Projetos para Terrenos Pequenos" || (!p.isBonus && landWidth(p.landSize) <= 5) },
  { title: "Bônus Exclusivos", filter: (p) => !!p.isBonus },
];

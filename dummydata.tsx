
export const fazendas = [
    {
      id: 1,
      nome: "Fazenda 1",
      municipio: "Município 1 - UF",
      area: "100.00 ha",
      consultores: [
        {
          tipo: "Consultor Técnico",
          nome: "João da Silva",
        },
        {
          tipo: "Consultor Vendas",
          nome: "Maria da Silva",
        },
      ],
    },
    {
      id: 2,
      nome: "Fazenda 2",
      municipio: "Município 2 - UF",
      area: "200.00 ha",
      consultores: [

        {
            tipo: "Consultor Técnico",
            nome: "Carlos Fernandes",
            dados: "Dados do Carlos",
            contato: "Contato do Carlos",
          },
        {
          tipo: "Consultor Vendas",
          nome: "Ana da Silva",
          dados: "Dados da Ana",
          contato: "Contato da Ana",
        },
      ],
    },
  ];

  export const eventos = [
    {
      title: "Evento Agromave 1",
      date: "01/07/2024",
      location: "Local",
      imageUrl: "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/278887710_5088215121231502_4561535633512625505_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=2453HHDHTlAQ7kNvgFkvm5X&_nc_ht=scontent.fpgz1-1.fna&oh=00_AYBRpfVbFp4niRr2U987gMGCNB56BZAxiI51XyXEL5OMKg&oe=66C276AF", 
      description: "Uma breve descrição sobre o evento Agromave...",
      onRedirect: () => console.log("Redirecionando para mais informações..."),
      destaque: "N",
    },
    {
      title: "Evento Agromave 2",
      date: "02/07/2024",
      location: "Local",
      imageUrl: "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/278629766_5075835602469454_1791650831511745138_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=GQVP5_KVWWoQ7kNvgHQtbIk&_nc_ht=scontent.fpgz1-1.fna&oh=00_AYDq6L4XwUYwyAo9t23elMU49mJD4iGHXoUKeX3_-hm3-g&oe=66C27AE8", 
      description: "Uma breve descrição sobre o evento Agromave...",
      onRedirect: () => console.log("Redirecionando para mais informações..."),
      destaque: "S",
    },
    {
      title: "Evento Agromave 3",
      date: "03/07/2024",
      location: "Local",
      imageUrl: "https://scontent.fpgz1-1.fna.fbcdn.net/v/t1.6435-9/84456520_2796624793723891_1695045277573971968_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=HuK4ebIyN80Q7kNvgHWWLLG&_nc_ht=scontent.fpgz1-1.fna&oh=00_AYCUmIS3hEf7OinFI5VJhzD-kYXTcHjMgfSHxPg2SttoAg&oe=66E4200D", 
      description: "Uma breve descrição sobre o evento Agromave...",
      onRedirect: () => console.log("Redirecionando para mais informações..."),
      destaque: "N",
    },
    {
      title: "Evento Agromave 4",
      date: "04/07/2024",
      location: "Local",
      imageUrl: "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/278887710_5088215121231502_4561535633512625505_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=2453HHDHTlAQ7kNvgFkvm5X&_nc_ht=scontent.fpgz1-1.fna&oh=00_AYBRpfVbFp4niRr2U987gMGCNB56BZAxiI51XyXEL5OMKg&oe=66C276AF", 
      description: "Uma breve descrição sobre o evento Agromave...",
      onRedirect: () => console.log("Redirecionando para mais informações..."),
      destaque: "S",
    },
    {
      title: "Evento Agromave 5",
      date: "05/07/2024",
      location: "Local",
      imageUrl: "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/278629766_5075835602469454_1791650831511745138_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=GQVP5_KVWWoQ7kNvgHQtbIk&_nc_ht=scontent.fpgz1-1.fna&oh=00_AYDq6L4XwUYwyAo9t23elMU49mJD4iGHXoUKeX3_-hm3-g&oe=66C27AE8", 
      description: "Uma breve descrição sobre o evento Agromave...",
      onRedirect: () => console.log("Redirecionando para mais informações..."),
      destaque: "N",
    },
    {
      title: "Evento Agromave 6",
      date: "06/07/2024",
      location: "Local",
      imageUrl: "https://scontent.fpgz1-1.fna.fbcdn.net/v/t1.6435-9/84456520_2796624793723891_1695045277573971968_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=HuK4ebIyN80Q7kNvgHWWLLG&_nc_ht=scontent.fpgz1-1.fna&oh=00_AYCUmIS3hEf7OinFI5VJhzD-kYXTcHjMgfSHxPg2SttoAg&oe=66E4200D", 
      description: "Uma breve descrição sobre o evento Agromave...",
      onRedirect: () => console.log("Redirecionando para mais informações..."),
      destaque: "S",
    },
    {
      title: "Evento Agromave 7",
      date: "07/07/2024",
      location: "Local",
      imageUrl: "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/278887710_5088215121231502_4561535633512625505_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=2453HHDHTlAQ7kNvgFkvm5X&_nc_ht=scontent.fpgz1-1.fna&oh=00_AYBRpfVbFp4niRr2U987gMGCNB56BZAxiI51XyXEL5OMKg&oe=66C276AF", 
      description: "Uma breve descrição sobre o evento Agromave...",
      onRedirect: () => console.log("Redirecionando para mais informações..."),
      destaque: "N",
    },
    {
      title: "Evento Agromave 8",
      date: "08/07/2024",
      location: "Local",
      imageUrl: "https://scontent.fpgz1-1.fna.fbcdn.net/v/t39.30808-6/278629766_5075835602469454_1791650831511745138_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=GQVP5_KVWWoQ7kNvgHQtbIk&_nc_ht=scontent.fpgz1-1.fna&oh=00_AYDq6L4XwUYwyAo9t23elMU49mJD4iGHXoUKeX3_-hm3-g&oe=66C27AE8", 
      description: "Uma breve descrição sobre o evento Agromave...",
      onRedirect: () => console.log("Redirecionando para mais informações..."),
      destaque: "S",
    },
    {
      title: "Evento Agromave 9",
      date: "09/07/2024",
      location: "Local",
      imageUrl: "https://scontent.fpgz1-1.fna.fbcdn.net/v/t1.6435-9/84456520_2796624793723891_1695045277573971968_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=HuK4ebIyN80Q7kNvgHWWLLG&_nc_ht=scontent.fpgz1-1.fna&oh=00_AYCUmIS3hEf7OinFI5VJhzD-kYXTcHjMgfSHxPg2SttoAg&oe=66E4200D", 
      description: "Uma breve descrição sobre o evento Agromave...",
      onRedirect: () => console.log("Redirecionando para mais informações..."),
      destaque: "N",
    },
  ];

  export const consultores = [
    {
      idFazenda: 1,
      nome: "João da Silva",
      tipo:"Consultor Tecnico",
      contato:'(99)99999-9999',
      email: "email@email.com",
    },
    {
      idFazenda: 1,
      nome: "Maria da Silva",
      tipo:"Consultor Vendas",
      contato:'(99)99999-9999',
      email: "email@email.com",
    },
    {
      idFazenda: 2,
      nome: "Carlos Fernandes",
      tipo:"Consultor Tecnico",
      contato:'(99)99999-9999',
      email: "email@email.com",
    },
    {
      idFazenda: 2,
      nome: "Ana da Silva",
      tipo:"Consultor Vendas",
      contato:'(99)99999-9999',
      email: "email@email.com",
    },
  ];
  
  export const visitas = [
    {
      id: 1,
      consultor: "José da Silva",
      data: "01/07/2024",
      tipo: "Prospecção",
      idFazenda: 1,
      link: "https://exemplo.com/visita/1",
    },
    {
      id: 2,
      consultor: "Maria Pereira",
      data: "03/07/2024",
      tipo: "Manutenção",
      idFazenda: 1,
      link: "https://exemplo.com/visita/2",
    },
    {
      id: 3,
      consultor: "Carlos Fernandes",
      data: "05/07/2024",
      tipo: "Consulta Técnica",
      idFazenda: 1,
      link: "https://exemplo.com/visita/3",
    },
    {
      id: 4,
      consultor: "Ana Silva",
      data: "07/07/2024",
      tipo: "Auditoria",
      idFazenda: 1,
      link: "https://exemplo.com/visita/4",
    },
    {
      id: 5,
      consultor: "João Carvalho",
      data: "09/07/2024",
      tipo: "Visita de Campo",
      idFazenda: 1,
      link: "https://exemplo.com/visita/5",
    },
    {
      id: 6,
      consultor: "Lucas Almeida",
      data: "11/07/2024",
      tipo: "Monitoramento",
      idFazenda: 1,
      link: "https://exemplo.com/visita/6",
    },
    {
      id: 7,
      consultor: "Fernanda Gomes",
      data: "13/07/2024",
      tipo: "Prospecção",
      idFazenda: 1,
      link: "https://exemplo.com/visita/7",
    },
    {
      id: 8,
      consultor: "Ricardo Oliveira",
      data: "15/07/2024",
      tipo: "Manutenção",
      idFazenda: 1,
      link: "https://exemplo.com/visita/8",
    },
    {
      id: 9,
      consultor: "Patrícia Souza",
      data: "17/07/2024",
      tipo: "Consulta Técnica",
      idFazenda: 1,
      link: "https://exemplo.com/visita/9",
    },
    {
      id: 10,
      consultor: "Thiago Santos",
      data: "19/07/2024",
      tipo: "Auditoria",
      idFazenda: 1,
      link: "https://exemplo.com/visita/10",
    },
    {
      id: 11,
      consultor: "Gabriel Silva",
      data: "21/07/2024",
      tipo: "Visita de Campo",
      idFazenda: 1,
      link: "https://exemplo.com/visita/11",
    },
    {
      id: 12,
      consultor: "Luana Costa",
      data: "23/07/2024",
      tipo: "Monitoramento",
      idFazenda: 2,
      link: "https://exemplo.com/visita/12",
    },
    {
      id: 13,
      consultor: "Pedro Fernandes",
      data: "25/07/2024",
      tipo: "Prospecção",
      idFazenda: 2,
      link: "https://exemplo.com/visita/13",
    },
    {
      id: 14,
      consultor: "Mariana Alves",
      data: "27/07/2024",
      tipo: "Manutenção",
      idFazenda: 2,
      link: "https://exemplo.com/visita/14",
    },
    {
      id: 15,
      consultor: "Rafael Moreira",
      data: "29/07/2024",
      tipo: "Consulta Técnica",
      idFazenda: 2,
      link: "https://exemplo.com/visita/15",
    },
    {
      id: 16,
      consultor: "Juliana Lima",
      data: "31/07/2024",
      tipo: "Auditoria",
      idFazenda: 2,
      link: "https://exemplo.com/visita/16",
    },
    {
      id: 17,
      consultor: "Vinícius Cardoso",
      data: "02/08/2024",
      tipo: "Visita de Campo",
      idFazenda: 2,
      link: "https://exemplo.com/visita/17",
    },
    {
      id: 18,
      consultor: "Beatriz Silva",
      data: "04/08/2024",
      tipo: "Monitoramento",
      idFazenda: 2,
      link: "https://exemplo.com/visita/18",
    },
    {
      id: 19,
      consultor: "Rodrigo Castro",
      data: "06/08/2024",
      tipo: "Prospecção",
      idFazenda: 2,
      link: "https://exemplo.com/visita/19",
    },
    {
      id: 20,
      consultor: "Carla Mendes",
      data: "08/08/2024",
      tipo: "Manutenção",
      idFazenda: 2,
      link: "https://exemplo.com/visita/20",
    },
  ];
  
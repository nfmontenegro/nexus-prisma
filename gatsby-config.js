module.exports = {
  siteMetadata: {
    title: 'JS ❤️',
    welcome: `I'm Nicolás Flores Montenegro.`,
    presentation: `Javascript Developer ❤️.`,
    profileDescription: `Soy un programador con 6 años de experiencia, me gusta todo lo que tenga que ver con Javascript y actualmente aprendiendo sobre Programación Funcional.`,
    aboutMe: `Me apasiona todo lo que tenga que ver con tecnología de programación, me encanta programar en mis proyectos personales en mis tiempos libres y leer foros como Medium o revisar Pull's Request/Commits en los perfiles de programadores avanzados en Github, aprender sobre las últimas actualizaciones del Stack que manejo.`,
    github: 'https://github.com/nfmontenegro',
    linkedin:
      'https://www.linkedin.com/in/nicol%C3%A1s-camilo-flores-montenegro-80b735110'
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui'
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
}

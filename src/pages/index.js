import React from "react"
import Layout from "../components/layout"
import SEO from "../components/common/seo"
import { Image } from "../components/common/image"
import Header from "../components/header"
import {
  FaAndroid,
  FaAngular,
  FaBootstrap,
  FaCss3Alt,
  FaDocker,
  FaAws,
  FaGitAlt,
  FaGrunt,
  FaGulp,
  FaHtml5,
  FaJava,
  FaJenkins,
  FaJira,
  FaJsSquare,
  FaNodeJs,
  FaNpm,
  FaPhp,
  FaReact,
  FaSass,
  FaVuejs,
  FaLess,
  FaApple,
  FaLinkedin,
  FaGithubSquare,
  FaGooglePlusSquare,
  FaSkype,
  FaInstagram
} from "react-icons/fa"

const IndexPage = () => (
  <Layout>
    <SEO title="Home"/>
    <div className="home-header-wrapper">
      <Header/>
      <section className="home-header-section">
        <div className="home-header-inner">
          <div className="home-header-image">
            <Image src="avatar.jpg" alt="user avatar"/>
            <div className="icons-wrapper">
              <FaAndroid className="tech-icon deg0"/>
              <FaAngular className="tech-icon deg16"/>
              <FaBootstrap className="tech-icon deg32"/>
              <FaCss3Alt className="tech-icon deg48"/>
              <FaDocker className="tech-icon deg64"/>
              <FaAws className="tech-icon deg80"/>
              <FaGitAlt className="tech-icon deg96"/>
              <FaGrunt className="tech-icon deg112"/>
              <FaGulp className="tech-icon deg128"/>
              <FaHtml5 className="tech-icon deg144"/>
              <FaJava className="tech-icon deg160"/>
              <FaJenkins className="tech-icon deg176"/>
              <FaJira className="tech-icon deg192"/>
              <FaJsSquare className="tech-icon deg208"/>
              <FaNodeJs className="tech-icon deg224"/>
              <FaNpm className="tech-icon deg240"/>
              <FaPhp className="tech-icon deg256"/>
              <FaReact className="tech-icon deg272"/>
              <FaSass className="tech-icon deg288"/>
              <FaVuejs className="tech-icon deg304"/>
              <FaLess className="tech-icon deg320"/>
              <FaApple className="tech-icon deg336"/>
            </div>
          </div>
          <div className="home-header-content">
             <h1>
              Alexander Vovchuk
            </h1>
            <hr/>
            <p className="home-header-content-icons">
              <a href="https://www.linkedin.com/in/alexandr-vovchuk-0a858158"><FaLinkedin/></a>
              <a href="mailto:a.vovchuk@gmail.com"><FaGooglePlusSquare/></a>
              <a href="https://github.com/bikalay"><FaGithubSquare/></a>
              <a href="skype:a_vovchuk?chat"><FaSkype/></a>
            </p>
            <p>Hi everyone and welcome to my personal Website!</p>
          </div>
        </div>
      </section>
    </div>
      <section className="container home-about-me-section">
        <h2 className="text-center text-md-left mb-4 mb-md-2">About Me</h2>
        <hr className="ml-0 d-none d-md-block mb-5" />
        <div className="row">
          <div className="col-12 col-md-2 mb-4 text-center text-md-left">
            <div className="d-inline-block">
            <Image src="avatar.jpg" alt="user avatar" className="mx-auto"/>
            </div>
          </div>
          <div className="col-12 col-md-10">
            <div className="card">
              <div className="card-body">
                <p>
                I am Alexander Vovchuk, software engineer from Russia.
                I live in small siberian city of Akademgorodok.
                I work in software development more than 10 years.
                I have rich experience in web and mobile development.
                I can work with frontend and backend technologies.
                </p>
                <div className="text-center text-md-left">
                <a className="btn btn-danger text-light font-weight-bold">Download CV</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </Layout>
)

export default IndexPage

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
  FaApple

} from "react-icons/fa";

const IndexPage = () => (
  <Layout>
    <SEO title="Home"/>
    <div className="home-header-wrapper">
      <Header/>
      <div className="home-header-section">
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
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage

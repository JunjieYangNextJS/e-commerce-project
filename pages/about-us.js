import Head from "next/head";
import Navbar from "../components/Navbars/Navbar";
import styled from "styled-components";
import Image from "next/dist/client/image";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Our Company</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Learn about our company and contact us for help."
        ></meta>
      </Head>
      <Navbar />
      <AboutUsHelpPage>
        <AboutUsHelpContainer>
          <AboutUsHelpSection>
            <AboutUsHelpTitle>About Our Company</AboutUsHelpTitle>
            <AboutUsHelpInfo>
              Influential, innovative and progressive, PoPo is reinventing a
              wholly modern approach to fashion. Under the new vision of
              creative director Junjie Yang, PoPo has redefined luxury for the
              21st century, further reinforcing its position as one of the
              world’s most desirable fashion houses. Eclectic, contemporary,
              romantic products represent the pinnacle of Italian craftsmanship
              and are unsurpassed for their quality and attention to detail.
            </AboutUsHelpInfo>
          </AboutUsHelpSection>
          <AboutUsHelpImageContainer shadowToRight={true}>
            <AboutUsHelpImage
              src={
                "https://images.unsplash.com/photo-1450297166380-cabe503887e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1045&q=80"
              }
              alt="fashion lady with luxuries"
              width={750}
              height={500}
            />
          </AboutUsHelpImageContainer>
        </AboutUsHelpContainer>
        <AboutUsHelpContainer>
          <AboutUsHelpImageContainer shadowToRight={false}>
            <AboutUsHelpImage
              src={
                "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              }
              alt="cute doggo looking at his laptop"
              width={750}
              height={500}
            />
          </AboutUsHelpImageContainer>
          <AboutUsHelpSection>
            <AboutUsHelpTitle>Need Help? Call Us</AboutUsHelpTitle>
            <AboutUsHelpInfo>
              For Customer Service: 925-xxx-xxxx
            </AboutUsHelpInfo>
            <AboutUsHelpInfo>
              For Technical Difficulties: 925-xxx-xxxx
            </AboutUsHelpInfo>
            <WorkingHours>
              Our Client Advisors are available Monday through Saturday, 9:00AM
              - 11:00PM (EST) and Sunday, 10:00AM - 9:00PM (EST), excluding
              holidays.
            </WorkingHours>
          </AboutUsHelpSection>
        </AboutUsHelpContainer>
      </AboutUsHelpPage>
    </>
  );
}

const AboutUsHelpPage = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 0px 5.2vw 120px 5.2vw;
  gap: 20px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1));
  @media all and (max-width: 1125px) {
    height: auto;
  }
`;

const AboutUsHelpContainer = styled.div`
  height: 500px;
  display: flex;
  padding-top: 3px;
  justify-content: space-between;

  @media all and (max-width: 1125px) {
    flex-direction: column;
    height: auto;
    align-items: center;
  }
`;

const AboutUsHelpSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  gap: 30px;
  width: 40vw;

  @media all and (max-width: 1125px) {
    width: 80vw;
    padding-bottom: 100px;
    margin: 0;
  }
`;

const AboutUsHelpTitle = styled.h1`
  font-size: 35px;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const AboutUsHelpInfo = styled.div`
  font-size: 19px;
  line-height: 1.7;
  @media all and (max-width: 1125px) {
    :first-child {
      text-indent: 50px;
    }
  }
`;

const AboutUsHelpImageContainer = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: ${({ shadowToRight }) =>
    shadowToRight ? "14px 14px 2px #606060" : "-14px 14px 2px #303030"};

  @media all and (max-width: 1660px) {
    box-shadow: none;
  }

  @media all and (max-width: 1125px) {
    position: relative;
    top: -20px;
  }
`;

const AboutUsHelpImage = styled(Image)`
  @media all and (max-width: 1660px) {
    object-fit: contain;
  }
`;

const WorkingHours = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  margin-left: 18px;
  width: 420px;

  @media all and (max-width: 1125px) {
    max-width: 85vw;
  }
`;

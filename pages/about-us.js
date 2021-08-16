import Navbar from "../components/Navbar";
import styled from "styled-components";
import Image from "next/dist/client/image";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <>
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
          <AboutUsImage>
            <Image
              src={
                "https://images.unsplash.com/photo-1450297166380-cabe503887e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1045&q=80"
              }
              width={750}
              height={500}
            />
          </AboutUsImage>
        </AboutUsHelpContainer>
        <AboutUsHelpContainer>
          <HelpImage>
            <Image
              src={
                "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              }
              width={750}
              height={500}
            />
          </HelpImage>
          <AboutUsHelpSection>
            <AboutUsHelpTitle>Need Help? Call Us</AboutUsHelpTitle>
            <AboutUsHelpInfo>
              For Customer Service: 925-xxx-xxxx
            </AboutUsHelpInfo>
            <AboutUsHelpInfo>
              For Technical Difficulties: 925-xxx-xxxx
            </AboutUsHelpInfo>
            <p>
              Our Client Advisors are available Monday through Saturday, 9:00AM
              - 11:00PM (EST) and Sunday, 10:00AM - 9:00PM (EST), excluding
              holidays.
            </p>
          </AboutUsHelpSection>
        </AboutUsHelpContainer>
      </AboutUsHelpPage>
      <Footer />
    </>
  );
}

const AboutUsHelpPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 1100px;
  max-height: 3000px;
  padding: 0px 100px;
  gap: 20px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1));
`;

const AboutUsHelpContainer = styled.div`
  height: 500px;
  display: flex;
  padding-top: 3px;
  justify-content: space-between;
`;

const AboutUsHelpSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  gap: 30px;
  width: 40vw;
`;

const AboutUsHelpTitle = styled.h1`
  font-size: 35px;
`;

const AboutUsHelpInfo = styled.div`
  font-size: 19px;
  line-height: 1.7;
`;

const AboutUsImage = styled.div`
  box-shadow: 14px 14px 2px #606060;
`;

const HelpImage = styled.div`
  box-shadow: -14px 14px 2px #303030;
`;

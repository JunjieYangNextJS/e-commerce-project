import React from "react";
import styled from "styled-components";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import CopyrightIcon from "@material-ui/icons/Copyright";

function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterTitle>Our Services</FooterTitle>
        <FooterContent>
          <FooterItem>Shipping Services</FooterItem>
          <FooterItem>Payment Options</FooterItem>
          <FooterItem>Returns & Exchanges</FooterItem>
          <FooterItem>Product Care</FooterItem>
        </FooterContent>
      </FooterWrapper>
      <FooterWrapper>
        <FooterTitle>The Company</FooterTitle>
        <FooterContent>
          <FooterItem>Careers</FooterItem>
          <FooterItem>Legal Terms</FooterItem>
          <FooterItem>Privacy & Cookies</FooterItem>
          <FooterItem>Corporate Information</FooterItem>
        </FooterContent>
      </FooterWrapper>
      <FooterWrapper>
        <FooterTitle>Find Us On</FooterTitle>
        <FooterContent>
          <FooterItem>
            <FooterLink>
              <FacebookIcon />
              <a
                target="_blank"
                href="https://facebook.com/"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </FooterLink>
          </FooterItem>
          <FooterItem>
            <FooterLink>
              <TwitterIcon />
              <a
                target="_blank"
                href="https://twitter.com/"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </FooterLink>
          </FooterItem>
          <FooterItem>
            <FooterLink>
              <InstagramIcon />
              <a
                target="_blank"
                href="https://instagram.com/"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </FooterLink>
          </FooterItem>
          <FooterItem>
            <FooterLink>
              <YouTubeIcon />
              <a
                target="_blank"
                href="https://youtube.com/"
                rel="noopener noreferrer"
              >
                Youtube
              </a>
            </FooterLink>
          </FooterItem>
        </FooterContent>
      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  background-color: #1b1b1b;
  height: 250px;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 13%;

  @media all and (max-width: 728px) {
    gap: 10%;
  }
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;

const FooterTitle = styled.div`
  color: #999;
  font-size: 20px;

  @media all and (max-width: 728px) {
    font-size: 2.9vw;
  }
`;

const FooterContent = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: -10px;
`;

const FooterItem = styled.li`
  list-style: none;
  color: #e5dfd9;
  font-size: 15px;
  line-height: 30px;
  cursor: pointer;

  @media all and (max-width: 728px) {
    font-size: 2.6vw;
  }
`;

const FooterLink = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
`;

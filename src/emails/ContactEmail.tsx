import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactEmail {
  name?: string;
}

export const ContactEmail = ({ name }: ContactEmail) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>flowX Contact Form</Preview>
      <Container style={container}>
        <Container style={{ padding: '24px 0' }}>
          <Link href={`https://flowx.one`} target="_blank">
            <Img
              src={`https://images.prismic.io/flow-x/Z79Ny57c43Q3gRjX_logo_black.png?auto=format,compress`}
              width="auto"
              height="40"
              alt="Logo flowX"
            />
          </Link>
        </Container>
        <Heading style={h1}>
          Hey {name}, thanks a lot for your interest in flowX!
        </Heading>

        <Text style={{ ...text, marginBottom: '14px' }}>
          We have received your request on our end and will get back to you as
          soon as possible! If you want to have a chat and have a talk with our
          experts, just call us at +41 (0) 44 389 10 60.
        </Text>

        <Text style={{ ...text, marginBottom: '14px' }}>
          flowX is a groundbreaking technology startup and a spin-off of GlassX
          AG. We are revolutionizing the building industry with our patented,
          fluid-based glass façade system that dynamically manages energy flows
          where they matter most – in the building envelope.
        </Text>

        <Text style={footer}>
          <Link
            href="https://flowx.one"
            target="_blank"
            style={{ ...link, color: '#898989' }}
          >
            flowx.one
          </Link>
          , disrupting the standards of bulding
          <br />
          with clean tech and sustainable solutions.
        </Text>
        <Container style={{ padding: '24px 0' }}>
          <Img
            src={`https://images.prismic.io/flow-x/Z79Ny57c43Q3gRjX_logo_black.png?auto=format,compress`}
            width="auto"
            height="15"
            alt="Logo flowX"
          />
          <Text style={footer}>
            Seefeldstrasse 224
            <br />
            CH - 8008 Zurich
            <br />
            +41 (0) 44 389 10 60
          </Text>

          <Container style={{ padding: '24px 0' }}>
            <Img
              src={`https://images.prismic.io/flow-x/Z8ne5BsAHJWomMvH_Unknown.jpeg?auto=format,compress`}
              width="auto"
              height="120"
              alt="Logo flowX"
              style={{ borderRadius: '10px' }}
            />
            <Text style={dieter}>Prof. Dietrich Schwarz</Text>
            <Text style={subtext}>
              Founder & Board of Directors
              <br />
              Schwarz Architekten AG <br /> University of Liechtenstein{' '}
            </Text>
          </Container>
        </Container>
      </Container>
    </Body>
  </Html>
);

ContactEmail.PreviewProps = {
  loginCode: 'sparo-ndigo-amurt-secan',
} as ContactEmail;

export default ContactEmail;

const main = {
  backgroundColor: '#f9f9f9',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const h1 = {
  color: '#343933',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const link = {
  color: '#343933',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
};

const text = {
  color: '#343933',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

const footer = {
  color: '#343933',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
};

const dieter = {
  color: '#343933',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '0',
};

const subtext = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '10px',
  lineHeight: '14px',
};

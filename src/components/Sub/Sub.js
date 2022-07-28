import styled from "styled-components";
import { useState } from "react";
import { animated, useTransition } from "react-spring";
import { Butterfly } from "../ButterflyImages";
import Button from "../Button";
import SearchBox from "../SearchBox";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  width: 675px;
  max-width: min(100%, calc(650px + 32px * 2));
  background-color: var(--color-primary);
  text-shadow: 1px 1px 2px rgb(0, 0, 0);
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.4);
  color: var(--color-text);
  padding: 32px;
  border: 4px solid var(--color-gray-800);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  overflow: hidden;
  position: relative;
  isolation: isolate;

  @media ${QUERIES.tabletAndSmaller} {
    width: 100%;
    gap: 8px;
  }
`;

const Title = styled.h1`
  font-size: ${30 / 16}rem;
  text-align: center;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  z-index: 2;
`;

const Loading = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  display: ${(p) => (p.loading === true ? "block" : "none")};
  z-index: 2;
`;

const SubbedMail = styled.div`
  z-index: 2;
`;

const Registered = styled.span`
  display: ${(p) => (p.notSubbed ? "none" : "inline-block")};
  font-size: ${20 / 16}rem;
  font-weight: var(--font-weight-medium);
  font-style: italic;
  z-index: 2;
`;

const Invalid = styled.span`
  display: ${(p) => (p.isNotInvalid ? "none" : "inline-block")};
  text-decoration: underline white;
  text-underline-offset: 4px;
  color: var(--color-gray-200);
  font-size: ${18 / 16}rem;
  font-weight: var(--font-weight-bold);
  z-index: 2;
`;

const Mail = styled(Invalid)`
  display: ${(p) => (p.notSubbed ? "none" : "inline-block")};
  margin-left: 12px;
  text-underline-offset: 6px;
  color: var(--color-gray-100);
  z-index: 2;
`;

const Input = styled(SearchBox)`
  display: ${(p) => (p.notSubbed ? "block" : "none")};
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
  z-index: 2;
`;

const SubButton = styled(Button)`
  display: ${(p) => (p.notSubbed ? "block" : "none")};
`;

const UnsubButton = styled(Button)`
  display: ${(p) => (p.notSubbed ? "none" : "block")};
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: -190px;
  left: -70px;

  & img {
    transform: rotate(30deg) rotateY(180deg);
  }
`;

export default function Sub({ siteUrl }) {
  let props = {
    from: { opacity: 0, transform: "scaleX(0)" },
    enter: { opacity: 0.8, transform: "scaleX(1)" },
  };

  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState("");
  const [invalid, setInvalid] = useState("");
  const [subbedMail, setSubbedMail] = useState(null);

  const getSub = async () => {
    const res = await fetch(`${siteUrl}/api/getsub`, { method: "GET" });
    const result = await res.json();
    if (result.error) {
      console.log("Error: ", result.error);
      setSubbedMail("");
    } else {
      setSubbedMail(result.mail);
    }
  };

  if (subbedMail === null) {
    getSub();
  }

  const transition = useTransition(loading, props);

  const sub = async () => {
    setInvalid("");
    if (mail === "") {
      setSubbedMail("");
      return setInvalid("Enter an e-mail first.");
    }

    setLoading(true);
    const res = await fetch(`${siteUrl}/api/sub/${mail}`, { method: "GET" });
    const result = await res.json();
    if (result.invalid) {
      setSubbedMail("");
      setInvalid("E-mail is invalid.");
    } else if (result.exists) {
      setSubbedMail("");
      setInvalid("E-mail exists already.");
    } else {
      setSubbedMail(result.mail);
    }
    setLoading(false);
  };
  const unsub = async () => {
    setInvalid("");
    setLoading(true);
    const res = await fetch(`${siteUrl}/api/unsub`, { method: "GET" });
    const result = await res.json();
    setSubbedMail("none");
    setLoading(false);
  };

  return (
    <>
      {transition((props, whatever) => (
        <animated.div style={props}>
          <Wrapper>
            <ImageWrapper>
              <Butterfly />
            </ImageWrapper>
            <Title>
              {subbedMail === "" || subbedMail === "none"
                ? "Subscribe for new posts"
                : "Subscribed!"}
            </Title>

            <Loading
              loading={loading ? true : undefined}
              src={`/blog/loading.gif`}
            />

            <SubbedMail>
              <Registered notSubbed={subbedMail === ""}>
                Registered e-mail:
              </Registered>
              <Invalid isNotInvalid={invalid === ""}>{invalid}</Invalid>
              <Mail notSubbed={subbedMail === ""}>{subbedMail}</Mail>
            </SubbedMail>

            <Input
              type="email"
              placeholder="E-mail.."
              notSubbed={subbedMail === "" || subbedMail === "none"}
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  sub();
                }
              }}
            />

            <ButtonContainer>
              <SubButton
                notSubbed={subbedMail === "" || subbedMail === "none"}
                type={`button`}
                onClick={() => sub()}
              >
                sub
              </SubButton>
              <UnsubButton
                notSubbed={subbedMail === "" || subbedMail === "none"}
                type={`button`}
                onClick={() => unsub()}
              >
                unsub
              </UnsubButton>
            </ButtonContainer>
          </Wrapper>
        </animated.div>
      ))}
    </>
  );
}

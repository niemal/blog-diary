// import uuid from "uuid";
import { v4 as uuid } from "uuid";
import Layout from "../components/Layout";
import { QUERIES } from "../components/constants";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import { animated, useTransition } from "react-spring";
import { diaryEntries, allowed } from "../../lib/diary_util";
import { config, author } from "../../lib/author";

export async function getServerSideProps(context) {
  for (let ip of allowed) {
    if (context.res.socket.remoteAddress.indexOf(ip) > -1) {
      return {
        props: {
          entries: diaryEntries.entries,
          today: diaryEntries.today,
          todaysEntry: diaryEntries.todaysEntry,
          siteUrl: config.siteUrl,
          author: author,
        },
      };
    }
  }

  return {
    props: {
      entries: [],
      siteUrl: config.siteUrl,
      author: author,
    },
  };
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  width: 100%;

  @media ${QUERIES.tabletAndSmaller} {
    margin-top: 120px;
  }
  @media ${QUERIES.phoneAndSmaller} {
    padding: 0px 16px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  font-size: ${32 / 16}rem;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  margin-bottom: 32px;
`;

const Day = styled.td`
  border: 3px solid var(--color-secondary);
  border-radius: 16px;
  padding: 16px;
  font-size: ${22 / 16}rem;
  font-weight: var(--font-weight-bold);
  text-align: center;
  transition: background-color color 250ms;

  @media ${QUERIES.phoneAndSmaller} {
    padding: 12px;
  }
`;

const FutureDay = styled(Day)`
  background-color: var(--color-text);
  color: var(--color-gray-200);

  &:hover {
    cursor: not-allowed;
  }
`;

const UnusedDay = styled(Day)`
  color: var(--color-tertiary);

  &:hover {
    cursor: not-allowed;
  }
`;

const UsedDay = styled(Day)`
  background-color: var(--color-primary);

  &:hover {
    cursor: pointer;
    background-color: rgb(100, 255, 255);
    color: rgb(55, 150, 255);
  }
`;

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-weight: var(--font-weight-light);
  color: var(--color-text);
  flex-basis: 350px;
`;

const MarkWrapper = styled.div`
  & img {
    width: 100%;
    object-fit: cover;
  }
`;

const ContentSpan = styled.span`
  font-size: ${18 / 16}rem;
  font-weight: var(--font-weight-medium);
  font-style: ${(p) => (p.mark === undefined ? "italic" : "normal")};
  padding: 0px 16px;
`;

const Vline = styled.div`
  opacity: 0.9;
  border-left: 8px dashed var(--color-tertiary);
  height: 8em;
`;

const TableTitle = styled.h2`
  font-size: ${36 / 16}rem;
  font-weight: 700;
  color: var(--color-text);
`;

const Table = styled.table`
  table-layout: auto;
  color: var(--color-text);
  border: 5px solid var(--color-tertiary);
  background-color: var(--color-secondary);
`;

export default function Diary({
  entries,
  today,
  todaysEntry,
  siteUrl,
  author,
}) {
  let props = {
    from: { opacity: 0, transform: "scaleY(0)" },
    enter: { opacity: 1, transform: "scaleY(1)" },
    trail: 100,
  };
  let [entryContent, setEntryContent] = useState([]);
  let [headerContent, setHeaderContent] = useState("");

  let transitionContent = useTransition(entryContent, props);
  let transitionHeader = useTransition(headerContent, props);

  if (entries.length === 0) {
    return (
      <Layout
        url={siteUrl + "/diary"}
        desc={"My own personal diary."}
        imageUrl={
          siteUrl + "/_next/image?url=%2Fbanners%2Fmeta_banner.png&w=1920&q=100"
        }
        social={author.social}
        overflow={"hidden"}
      >
        <Wrapper>
          <Content>
            {transitionHeader((props, h) => (
              <animated.h1 style={{ "text-align": "center", ...props }}>
                Sorry, this content is currently private.
              </animated.h1>
            ))}
          </Content>
        </Wrapper>
      </Layout>
    );
  }

  let diaryLayouts = [];

  const clicked = (day, month, year, content) => {
    setHeaderContent(`${day}/${month}/${year}`);

    let parsed = content
      .map((c) => {
        let mark, text;

        if (c.startsWith("+")) {
          mark = "check";
          text = c.slice(1, c.length).trim();
        } else if (c.startsWith("-")) {
          mark = "cancel";
          text = c.slice(1, c.length).trim();
        } else {
          text = c;
        }

        if (text === "") {
          return;
        }

        return {
          text: text,
          mark: mark,
        };
      })
      .filter((c) => c !== undefined);

    setEntryContent(parsed);
  };

  entries.forEach((entry) => {
    let layout = [];

    layout.push(`${entry[0] + 1}, ${entry[1]}`);
    let entryBody = [];
    for (let i = 0; i < entry[2].length; i += 7) {
      let entryRow = [];

      let max = i + 7;
      if (max > entry[2].length) max = entry[2].length;

      for (let y = i; y < max; y++) {
        if (entry[2][y][2])
          entryRow.push(
            <FutureDay key={`entry-${y}`}>{entry[2][y][0]}</FutureDay>
          );
        else if (entry[2][y][1].length === 0)
          entryRow.push(
            <UnusedDay key={`entry-${y}`}>{entry[2][y][0]}</UnusedDay>
          );
        else
          entryRow.push(
            <UsedDay
              key={`entry-${y}`}
              onClick={() =>
                clicked(entry[2][y][0], entry[0] + 1, entry[1], entry[2][y][1])
              }
            >
              {entry[2][y][0]}
            </UsedDay>
          );
      }
      entryBody.push(<tr key={`entry-${i}`}>{entryRow}</tr>);
    }
    layout.push(
      <tbody key={`${entry[0] + 1}, ${entry[1]}`}>{entryBody}</tbody>
    );
    diaryLayouts.push(layout);
  });

  if (entryContent.length === 0) {
    if (today) {
      clicked(null, null, null, todaysEntry[1]);
      setHeaderContent(todaysEntry[0]);
    } else {
      setHeaderContent("No entry has been made yet today!");
      setEntryContent([
        ["You can click on the diary below to see available entries!", ""],
      ]);
    }
  }

  return (
    <Layout
      url={siteUrl + "/diary"}
      desc={"My own personal diary."}
      imageUrl={
        siteUrl + "/_next/image?url=%2Fbanners%2Fmeta_banner.png&w=1920&q=100"
      }
      social={author.social}
      overflow={"hidden"}
    >
      <Wrapper>
        <Content>
          {transitionHeader((props, h) => (
            <animated.h1 style={props}>{h}</animated.h1>
          ))}
          {transitionContent((props, c) => (
            <animated.div key={uuid()} style={props}>
              <ContainerWrapper>
                <MarkWrapper>
                  {c.mark !== undefined ? (
                    <Image
                      src={`/blog/${c.mark}.png`}
                      alt={""}
                      width={30}
                      height={30}
                    />
                  ) : (
                    ""
                  )}
                </MarkWrapper>
                <ContentSpan mark={c.mark}>{c.text}</ContentSpan>
              </ContainerWrapper>
            </animated.div>
          ))}
        </Content>

        <Vline />
        <TableTitle>{diaryLayouts[0][0]}</TableTitle>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {diaryLayouts[0][1]}
        </Table>
      </Wrapper>
    </Layout>
  );
}

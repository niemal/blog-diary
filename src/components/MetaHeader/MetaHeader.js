import Head from "next/head";

function MetaHeader({
  title = "Welcome to niemalground!",
  url = "",
  desc = "",
  imageUrl = "",
  // preload = [],
}) {
  // preload.push("/blog/twitter.svg");
  // preload.push("/blog/github.svg");

  return (
    <Head>
      <title>{title}</title>
      <meta name="author" content="niemal" />
      <meta name="application-name" content="blog-diary" />
      <meta name="description" content={desc} />
      <meta name="thumbnail" content={imageUrl} />

      <link rel="icon" href="/blog/favicon.ico" />
      <link rel="image_src" href={imageUrl} />

      {/* {preload
        .filter((img) => img !== undefined && img !== "")
        .map((img) => (
          <link key={uuid()} rel="preload" href={img} as="image" />
        ))} */}

      <meta
        property="og:type"
        content={title !== "Welcome to niemalground!" ? "article" : "website"}
      />
      <meta property="og:site_name" content="blog-diary" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@niemal_dev" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
}

export default MetaHeader;

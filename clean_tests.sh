#!/bin/bash

# posts
rm -rf ./posts/a_ridiculous_long_blog_title_ayy_lmao_yes_it_is
rm -rf "./posts/a_ridiculous_long_blog_title_ayy_lmao_yes_it_is copy"
rm -rf "./posts/a_ridiculous_long_blog_title_ayy_lmao_yes_it_is copy 2"
rm -rf "./posts/a_ridiculous_long_blog_title_ayy_lmao_yes_it_is copy 3"
rm -rf "./posts/a_ridiculous_long_blog_title_ayy_lmao_yes_it_is copy 4"
rm -rf ./posts/another_blog_post_heh
rm -rf ./posts/markdown_example
rm -rf ./posts/random_title_94
rm -rf ./posts/random_title_9338838
rm -rf ./posts/title_of_the_blog_post
rm -rf ./posts/yeah_well_what_is
rm -rf ./posts/yet_another_blog_post

# move everything for nginx rendering
#if [ ! -d "./pages/blog" ]; then
#    mkdir "./pages/blog"
#    mv ./pages/* ./pages/blog 2> /dev/null
#    mv ./pages/blog/_app.js ./pages/_app.js
    # nesting everything for nginx multi-nextjs reverse proxies
#    find ./pages/blog -type f -readable -writable -exec sed -i "s/\.\.\//\.\.\/\.\.\//m" {} \;
#else
    # nest all changed files in pages
#    CHANGED_FILES=( $(git show --name-only --pretty='' HEAD | grep pages) )
#    for (( i=0; i<${#CHANGED_FILES[@]}; i++ ))
#    do
#       if [ "${CHANGED_FILES[$i]}" == "pages/_app.js"]; then
#               continue
#       fi
#        sed -i "s/\.\.\//\.\.\/\.\.\//g" ${CHANGED_FILES[$i]}
#        mv ${CHANGED_FILES[$i]} ./pages/blog/$(echo "${CHANGED_FILES[$i]}" | sed "s/pages\///")
#    done
#fi

# make sure blog.js gets renamed to index.js
#mv ./pages/blog/blog.js ./pages/blog/index.js 2> /dev/null

cat <<EOF > next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/blog',
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["cdn.pixabay.com", "avatars.githubusercontent.com"],
  },
}

module.exports = nextConfig
EOF

cat <<EOF > config.json
{
    "siteUrl": "https://niemal.dev/blog",
    "diary-allowed": ["none"],
    "service": "gmail",
    "auth": {
        "user": "niemallamein@gmail.com"
    }
}
EOF

# diary
rm -rf "./diary-entries/today"
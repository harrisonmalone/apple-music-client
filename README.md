# Apple Music Client

## Some Usability Tips

1. Get album artwork from the `album-art` command line tool, if the tool still can't find artwork need to upload a "640x640" image to S3 bucket
2. Leave the pitchfork field just in the form for now
3. Could figure out how to play each album using the apple music api, i'm not sure how tricky that implementation would be, could have little play icon next to the i
4. To reset the add album to database need to clear localstorage so that data can be populated again in the /db view
5. Could implement some sort of link validator, to ensure that wikipedia urls are all good
6. Keen for more sorting options
  a. Sort in reverse order based on year
  b. Sort in alphabetical order based on title of album
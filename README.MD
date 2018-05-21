## Node-red subtitles downloader

A wrapper around dbsub downloader https://github.com/ka2er/node-subdb-api so it can be used in node-red. Takes in a string of the full path of a video clip as msg.payload. It looks for
subtitles in thesubdb online and if they exist, the first available subtitle file is downloaded. The subtitle file is renamed to the same name as
the file that was inputted with an extension of .srt and then stored to the same directory.

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Blob, FormData } from 'formdata-node';
import fetch from 'node-fetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { idOfArtwork, dalleImage_url } = req.body;

  idOfArtwork.map(async (id: any, index: number) => {
    try {
      const imageFromUrl = await axios.get(dalleImage_url[index].url!, {
        responseType: 'arraybuffer',
      });
      const buffer = Buffer.from(imageFromUrl.data, 'binary');
      const file = new Blob([buffer], { type: 'image/jpeg' });

      const form: any = new FormData();
      form.append('files.image', file);
      form.append(
        'data',
        JSON.stringify({
          stand_by_url: '',
        })
      );
      await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/artworks/${id}`, {
        method: 'put',
        body: form,
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      });

      // const data: any = await artworkResponse.json();
      // console.log('data', data);
    } catch (errArtwork: any) {
      console.error('artworks', errArtwork);
    }
  });

  return res.status(200).json('images generated');
}

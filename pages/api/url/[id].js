import isUrl from 'is-url';
import firebase from '../../../lib/firebase';

const shortUrlBasePath = `${process.env.VERCEL_URL}/s/`

export default async (req, res) => {
    const { id } = req.query
    if(req.method === 'POST') {
        const { redirect } = await req.body;
        const data = { redirect }
        if(isUrl(redirect)) {
            const resRef = await firebase.collection('urls').doc(id).set(data);
            const urlRedirectPath = shortUrlBasePath + id;
            res.status(200).json({ redirect: urlRedirectPath, id });
        } else {
            res.status(400).json({ error: 'Not A Valid Url' });
        }
    };
    if(req.method === 'GET') {
        const resRef = firebase.collection('urls').doc(id);
        const doc = await resRef.get();
        const data = await doc.data();
        if(doc.exists) {
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: 'Does Not Exist' });
        }
    }
}
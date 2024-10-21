const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let data = {
    materials: []
};

app.get('/materials', (req, res) => {
    return res.status(200).json(data.materials);
});

app.post('/materials', (req, res) => {
    const { name, qtde } = req.body;

    if (!name || !qtde) {
        return res.status(400).json({error: 'Nome e quantidade são obrigatórios'})
    }

    const newMaterial = {
        id: data.materials.length + 1,
        name,
        qtde
    };

    data.materials.push(newMaterial);
    return res.status(201).json(newMaterial);
});

app.get('/materials/:id', (req, res) => {
    const materialId = parseInt(req.params.id);

    const material = data.materials.find(material => material.id === materialId)

    if (!material) {
        return res.status(404).json({ error: 'Material não encontrado.' })
    }

    return res.status(404).json({ material })
})

app.put('/materials/:id', (req, res) => {
    const materialId = parseInt(req.params.id);
    const { material } = req.body;

    if (!material || !material.name || !material.qtde) {
        return res.status(404).json({ error: 'Nome  quantidade são obrigatórios para atualização.' });
    }

    const existingMaterial = data.materials.find(material => material.id === materialId);

    if (!existingMaterial) {
        return res.status(404).json({ error: 'Material não encontrado.' })
    }

    existingMaterial.name = material.name;
    existingMaterial.qtde = material.qtde;

    return res.status(200).json({ material: existingMaterial });
});

app.delete('/materials/:id', (req, res) => {
    const materialId = parseInt(req.params.id);
    
    const updateMaterials = data.materials.filter(material => material.id !== materialId)

    if (updateMaterials.length === data.materials.length) {
        return res.status(404).json({error: 'Material não encontrado.'})
    }

    data.materials = updateMaterials;

    return res.status(200).json(data.materials);
})

app.listen(port, () => {
    console.log(`Aplicação rodando na porta: ${port}`);
});

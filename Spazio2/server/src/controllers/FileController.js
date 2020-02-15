const path = require('path');
const fs = require('fs');

class FileController {
    show (req, res) {
        const {file } = req.params;

        const filePath = path.resolve(__dirname, '..', '..', 'uploads', file);

        if(fs.existsSync(filePath))
            return res.sendFile(filePath);
            
        const logo = path.resolve(__dirname, '..', '..', 'uploads', 'logo.png');

        return res.sendFile(logo);
    }
}

module.exports = new FileController();
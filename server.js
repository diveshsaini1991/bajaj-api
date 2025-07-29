const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

function processData(dataArray) {
    const result = {
        is_success: true,
        user_id: "divesh_saini_19112004", 
        email: "diveshsaini1991@gmail.com", 
        roll_number: "2210991527", 
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: ""
    };

    let numericSum = 0;
    let alphabetChars = [];

    try {
        dataArray.forEach(item => {
            const str = String(item);
            
            if (!isNaN(str) && !isNaN(parseFloat(str)) && str.trim() !== '') {
                const num = parseInt(str);
                numericSum += num;
                
                if (num % 2 === 0) {
                    result.even_numbers.push(str);
                } else {
                    result.odd_numbers.push(str);
                }
            }
            else if (/^[a-zA-Z]+$/.test(str)) {
                result.alphabets.push(str.toUpperCase());
                for (let char of str) {
                    alphabetChars.push(char);
                }
            }
            else if (/[^a-zA-Z0-9]/.test(str)) {
                result.special_characters.push(str);
            }
        });

        result.sum = numericSum.toString();

        if (alphabetChars.length > 0) {
            alphabetChars.reverse();
            result.concat_string = alphabetChars.map((char, index) => {
                return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
            }).join('');
        }

    } catch (error) {
        result.is_success = false;
        console.error('Error processing data:', error);
    }

    return result;
}

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array"
            });
        }

        const result = processData(data);
        res.status(200).json(result);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1,
        message: "BFHL API is running successfully"
    });
});

app.get('/', (req, res) => {
    res.json({
        message: "BFHL API Server is running",
        endpoints: {
            POST: "/bfhl - Main API endpoint",
            GET: "/bfhl - Status check"
        }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        is_success: false,
        error: "Something went wrong!"
    });
});

app.use('*', (req, res) => {
    res.status(404).json({
        is_success: false,
        error: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;
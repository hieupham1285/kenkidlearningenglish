import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, IconButton, CircularProgress, Alert } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

// Đường dẫn tới file từ vựng tiếng Anh và tiếng Việt trên GitHub Gist
const EN_URL = "https://gist.githubusercontent.com/hieupham1285/cacfd7d27ad6002f9107762d19b2518f/raw/English.txt";
const VI_URL = "https://gist.githubusercontent.com/hieupham1285/06999bfd4889d15be36a3d100631edbe/raw/Vietnam.txt";

interface Word {
  english: string;
  vietnamese: string;
  phonetic: string;
}

// Hàm lấy phiên âm từ dictionaryapi.dev API
const fetchPhonetic = async (word: string): Promise<string> => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    
    if (data && data[0] && data[0].phonetic) {
      return data[0].phonetic;
      // return `${data[0].phonetic}`;
    }

    /* 
    const phonetic = data[0].phonetics?.find((p: any) => p.text)?.text;
    //   return phonetic ? phonetic : 'Không có phiên âm';

    if (phonetic) {
      return phonetic;
    } 
    */
    
    // Nếu không tìm thấy phiên âm, tạo phiên âm đơn giản
    return generateSimplePhonetic(word);
  } catch (error) {
    console.error('Error fetching phonetic:', error);
    return generateSimplePhonetic(word);
  }
};

// Hàm tạo phiên âm đơn giản khi không có API
const generateSimplePhonetic = (word: string): string => {
  const rules: { [key: string]: string } = {
    'a': 'æ', 'e': 'ɛ', 'i': 'ɪ', 'o': 'ɒ', 'u': 'ʌ',
    'ay': 'eɪ', 'ee': 'iː', 'oo': 'uː', 'ou': 'aʊ', 'ow': 'aʊ',
    'ch': 'tʃ', 'sh': 'ʃ', 'th': 'θ', 'ng': 'ŋ',
    'c': 'k', 'g': 'ɡ', 'j': 'dʒ', 'y': 'j'
  };

  let phonetic = word.toLowerCase();

  // Áp dụng các quy tắc
  for (const [pattern, replacement] of Object.entries(rules)) {
    phonetic = phonetic.replace(new RegExp(pattern, 'g'), replacement);
  }

  // Thêm dấu nhấn âm đơn giản
  if (phonetic.length > 1) {
    phonetic = `ˈ${phonetic}`;
  }

  return `/${phonetic}/`;
};

const WordList: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWords = async () => {
      try {
        // Read English words
        // const englishResponse = await fetch('/English.txt');
        const englishResponse = await fetch(EN_URL);
        const englishText = await englishResponse.text();
        const englishWords = englishText.split('\n').filter(word => word.trim());

        // Read Vietnamese words
        const vietnameseResponse = await fetch(VI_URL);
        const vietnameseText = await vietnameseResponse.text();
        const vietnameseWords = vietnameseText.split('\n').filter(word => word.trim());

        // Load words with phonetics
        const wordPromises = englishWords.map(async (english, index) => {
          const phonetic = await fetchPhonetic(english.trim());
          return {
            english: english.trim(),
            vietnamese: vietnameseWords[index]?.trim() || '',
            phonetic: phonetic
          };
        });

        const combinedWords = await Promise.all(wordPromises);
        setWords(combinedWords);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải danh sách từ vựng');
        setLoading(false);
      }
    };

    loadWords();
  }, []);

  const handleSpeak = (text: string, lang: 'en-GB' | 'en-US') => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {words.map((word, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="h6" component="div">
                    {word.english}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {word.phonetic}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {word.vietnamese}
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={() => handleSpeak(word.english, 'en-GB')}>
                UK  <VolumeUpIcon />
                </IconButton>
                <IconButton onClick={() => handleSpeak(word.english, 'en-US')}>
                US  <VolumeUpIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default WordList;
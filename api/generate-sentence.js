// api/generate-sentence.js
export default async function handler(req, res) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리 (CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST 메서드만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { term } = req.body;

    if (!term) {
      return res.status(400).json({ error: 'Term is required' });
    }

    // OpenAI API 키 확인
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API key not found');
      // 폴백 예문 반환
      return res.status(200).json({
        sentence: `This is an example sentence using _____.`
      });
    }

    // OpenAI API 호출
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: `Write ONE natural English sentence (max 20 words) that correctly uses the word or phrase "${term}". Return only the sentence.`
          }
        ],
        temperature: 0.7,
        max_tokens: 60,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      
      // 폴백 예문 반환
      return res.status(200).json({
        sentence: `This is an example sentence using _____.`
      });
    }

    const data = await response.json();
    const sentence = data.choices[0].message.content.trim();

    // 빈칸 치환 (fuzzy matching)
    const maskedSentence = maskTerm(term, sentence);

    return res.status(200).json({
      sentence: maskedSentence
    });

  } catch (error) {
    console.error('Server error:', error);
    
    // 에러 시 폴백 예문 반환
    return res.status(200).json({
      sentence: `This is an example sentence using _____.`
    });
  }
}

// 단어/구문을 빈칸으로 치환하는 함수
function maskTerm(term, sentence) {
  try {
    // 토큰 기반 매칭 (대소문자, 구두점 무시)
    const tokens = term.toLowerCase().match(/\w+/g) || [];
    if (tokens.length === 0) {
      return sentence.replace(new RegExp(term, 'gi'), '_____');
    }

    // 토큰들을 연결한 패턴 생성
    const pattern = '\\b' + tokens.map(token => 
      token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    ).join('\\W+') + '\\b';

    const regex = new RegExp(pattern, 'gi');
    
    if (regex.test(sentence)) {
      return sentence.replace(regex, '_____');
    }

    // 정확한 매칭 실패시 단순 치환
    return sentence.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '_____');
    
  } catch (error) {
    console.error('Masking error:', error);
    // 에러 시 단순 치환
    return sentence.replace(new RegExp(term, 'gi'), '_____');
  }
}
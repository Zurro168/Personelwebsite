import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  try {
    const filePath = path.join(process.cwd(), 'src/data/commodities', `${slug}.json`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Commodity packet not found' }, { status: 404 });
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to resolve packet' }, { status: 500 });
  }
}

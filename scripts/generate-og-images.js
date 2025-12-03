import satori from 'satori';
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load fonts
const notoSansBold = readFileSync(join(__dirname, 'NotoSans-Bold.ttf'));
const notoSansRegular = readFileSync(join(__dirname, 'NotoSans-Regular.ttf'));

// Project data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    shortDescription: "A full-stack e-commerce solution with real-time inventory management.",
    icon: "🛒",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    id: 2,
    title: "Task Management App",
    shortDescription: "Collaborative task management tool with team features.",
    icon: "✓",
    tags: ["React", "Firebase", "TypeScript"],
  },
  {
    id: 3,
    title: "Weather Dashboard",
    shortDescription: "Beautiful weather forecasting app with location-based predictions.",
    icon: "🌤️",
    tags: ["React", "API Integration", "Charts"],
  },
  {
    id: 4,
    title: "Portfolio Website Builder",
    shortDescription: "Drag-and-drop portfolio builder for creators and developers.",
    icon: "🎨",
    tags: ["React", "Builder", "Templates"],
  },
  {
    id: 5,
    title: "Chat Application",
    shortDescription: "Real-time messaging platform with video call support.",
    icon: "💬",
    tags: ["React", "WebRTC", "Socket.io"],
  },
  {
    id: 6,
    title: "Analytics Dashboard",
    shortDescription: "Data visualization platform with customizable charts and reports.",
    icon: "📊",
    tags: ["React", "D3.js", "Data Viz"],
  }
];

async function generateOGImage(project) {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          padding: '60px',
          fontFamily: 'Noto Sans',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(30, 30, 30, 0.9)',
                borderRadius: '24px',
                padding: '60px',
                border: '3px solid rgba(255, 255, 255, 0.15)',
                width: '100%',
                maxWidth: '1000px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '100px',
                      marginBottom: '30px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      width: '140px',
                      height: '140px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '3px solid rgba(255, 255, 255, 0.2)',
                    },
                    children: project.icon,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '64px',
                      fontWeight: 'bold',
                      color: 'white',
                      textAlign: 'center',
                      marginBottom: '20px',
                      lineHeight: 1.2,
                      fontFamily: 'Noto Sans',
                    },
                    children: project.title,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '26px',
                      color: 'rgba(255, 255, 255, 0.85)',
                      textAlign: 'center',
                      marginBottom: '40px',
                      lineHeight: 1.4,
                      maxWidth: '800px',
                      fontFamily: 'Noto Sans',
                    },
                    children: project.shortDescription,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '12px',
                      justifyContent: 'center',
                    },
                    children: project.tags.map((tag) => ({
                      type: 'div',
                      props: {
                        style: {
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
                          color: 'white',
                          padding: '12px 24px',
                          borderRadius: '9999px',
                          fontSize: '20px',
                          fontWeight: '600',
                          border: '2px solid rgba(102, 126, 234, 0.5)',
                          fontFamily: 'Noto Sans',
                        },
                        children: tag,
                      },
                    })),
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      marginTop: '50px',
                      fontSize: '24px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontWeight: '600',
                      fontFamily: 'Noto Sans',
                    },
                    children: 'platour.net',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans',
          data: notoSansBold,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Noto Sans',
          data: notoSansRegular,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  // Convert SVG to PNG with opaque background
  const pngBuffer = await sharp(Buffer.from(svg))
    .flatten({ background: '#0a0a0a' })
    .png()
    .toBuffer();

  return pngBuffer;
}

async function main() {
  console.log('🎨 Generating OG images...\n');

  const outputDir = join(__dirname, '../public/og');
  mkdirSync(outputDir, { recursive: true });

  for (const project of projects) {
    try {
      console.log(`Generating OG image for: ${project.title}`);
      const imageBuffer = await generateOGImage(project);
      const outputPath = join(outputDir, `project-${project.id}.png`);
      writeFileSync(outputPath, imageBuffer);
      console.log(`✅ Saved: /og/project-${project.id}.png`);
    } catch (error) {
      console.error(`❌ Failed to generate image for project ${project.id}:`, error);
    }
  }

  console.log('\n✨ All OG images generated successfully!');
}

main().catch(console.error);

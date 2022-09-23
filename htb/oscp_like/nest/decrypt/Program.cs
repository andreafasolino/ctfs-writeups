using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;using System;

namespace decrypt
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            RD("yyEq0Uvvhq2uQOcWG8peLoeRQehqip/fKdeG/kjEVb4=", "667912", "1313Rf99", 3, "1L1SA61493DRV53Z", 256);
        }
        
        private static string RD(string cipherText, string passPhrase, string saltValue, int passwordIterations, string initVector, int keySize)
		{
			byte[] bytes = Encoding.ASCII.GetBytes(initVector);
			byte[] bytes2 = Encoding.ASCII.GetBytes(saltValue);
			byte[] array = Convert.FromBase64String(cipherText);
			Rfc2898DeriveBytes rfc2898DeriveBytes = new Rfc2898DeriveBytes(passPhrase, bytes2, passwordIterations);
			checked
			{
				byte[] bytes3 = rfc2898DeriveBytes.GetBytes((int)Math.Round((double)keySize / 8.0));
				ICryptoTransform cryptoTransform = new AesCryptoServiceProvider
				{
					//Mode = 1
					Mode = System.Security.Cryptography.CipherMode.CBC
				}.CreateDecryptor(bytes3, bytes);
				MemoryStream memoryStream = new MemoryStream(array);
				CryptoStream cryptoStream = new CryptoStream(memoryStream, cryptoTransform, 0);
				byte[] array2 = new byte[array.Length + 1];
				int num = cryptoStream.Read(array2, 0, array2.Length);
				memoryStream.Close();
				cryptoStream.Close();
				String @string = Encoding.ASCII.GetString(array2, 0, num);
				Console.WriteLine(@string);
				return Encoding.ASCII.GetString(array2, 0, num);
			}
		}



    }
}

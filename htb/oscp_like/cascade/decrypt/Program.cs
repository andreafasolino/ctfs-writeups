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
            DecryptString("BQO5l5Kj9MdErXx6Q6AGOw==","c4scadek3y654321");
        }
        
        public static string DecryptString(string EncryptedString, string Key)
		{
			byte[] array = Convert.FromBase64String(EncryptedString);
			Aes aes = Aes.Create();
			aes.KeySize = 128;
			aes.BlockSize = 128;
			aes.IV = Encoding.UTF8.GetBytes("1tdyjCbY1Ix49842");
			// aes.Mode = 1;
            aes.Mode = System.Security.Cryptography.CipherMode.CBC;
			aes.Key = Encoding.UTF8.GetBytes(Key);
			string @string;
			using (MemoryStream memoryStream = new MemoryStream(array))
			{
				using (CryptoStream cryptoStream = new CryptoStream(memoryStream, aes.CreateDecryptor(), 0))
				{
					byte[] array2 = new byte[checked(array.Length - 1 + 1)];
					cryptoStream.Read(array2, 0, array2.Length);
					@string = Encoding.UTF8.GetString(array2);
				}
			}
            Console.WriteLine(@string);
			return @string;
		}



    }
}
